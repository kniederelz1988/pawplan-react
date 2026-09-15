import { useCallback, useEffect } from "react";

import { Button, Field, HStack, Input, Spacer } from "@chakra-ui/react";
import DatePicker from "@components/utils/DatePicker";
import { VolunteerModel } from "@models/VolunteerModel";
import { dateToDateValue, dateToTimestamp, dateValueToDate, timestampToDate, timestampToDateValue } from "@helpers/TimeHelpers";
import { Controller, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { volunteerEditSchema } from "@schemas/volunteerSchemas";

type VolunteerFormProps = {
    volunteer: VolunteerModel,
    onSubmit: (v: VolunteerModel) => void,
    onReset: () => void
}
type VolunteerFormData = {
    name: string,
    birthday: Date
}

export default function VolunteerForm({ volunteer, onSubmit, onReset } : VolunteerFormProps) {
    const form = useForm({
        mode: "onBlur",
        reValidateMode: "onChange",
        resolver: yupResolver(volunteerEditSchema),
        defaultValues: {
            name: "",
            birthday: undefined
        }
    })

    const birthdayValue = useWatch({ name: "birthday", control: form.control })

    useEffect(() => {
        if (!volunteer) {
            form.resetField("name")
            form.resetField("birthday")
            return
        }

        form.reset({
            "name": volunteer.name,
            "birthday": timestampToDate(volunteer.birthday),
        })
    }, [form, volunteer])

    const handleFormSubmit = useCallback((data: VolunteerFormData) => {
        const tVolunteer: VolunteerModel = {
            id: volunteer.id,
            userId: volunteer.userId,
            birthday: dateToTimestamp(data.birthday),
            volunteerSince: volunteer.volunteerSince,
            name: volunteer.name
        }

        onSubmit(tVolunteer)
    }, [volunteer, onSubmit])
    const handleFormReset = useCallback((e: React.SyntheticEvent) => {
        e.preventDefault();
        onReset()
    }, [onReset])

    return (
        <form onSubmit={form.handleSubmit(handleFormSubmit)} onReset={handleFormReset}>
            <HStack>
                <Field.Root disabled>
                    <Field.Label>Id</Field.Label>
                    <Input placeholder={volunteer.id}/>
                </Field.Root>

                <Spacer h={4} />

                <Field.Root disabled>
                    <Field.Label>User id</Field.Label>
                    <Input placeholder={volunteer.userId}/>
                </Field.Root>
            </HStack>
        
            <Spacer h={4} />

            <Field.Root invalid={!!form.formState.errors.name}>
                <Field.Label>Name</Field.Label>
                <Input 
                    type="text" 
                    aria-invalid={!!form.formState.errors.name}
                    {...form.register("name")}
                     placeholder="John Doe/Jane Roe" />
                <Field.ErrorText>
                    <Field.ErrorIcon />
                    {form.formState.errors.name?.message}
                </Field.ErrorText>
            </Field.Root>

            <Spacer h={4} />

            <HStack align={"flex-start"}>
                <Controller name="birthday" control={form.control}
                    render={({ field }) => (
                        <Field.Root invalid={!!form.formState.errors.birthday}>
                            <DatePicker 
                                value={birthdayValue ? [dateToDateValue(birthdayValue)] : []}
                                onValueChange={(d) => {
                                    if (!d.value.length) {
                                        field.onChange(null)
                                        return
                                    }

                                    field.onChange(dateValueToDate(d.value[0]))
                                }}
                                onBlur={() => field.onBlur()}
                            >
                                Birthday
                            </DatePicker>
                            <Field.ErrorText>
                                <Field.ErrorIcon />
                                {form.formState.errors.birthday?.message}
                            </Field.ErrorText>
                        </Field.Root>
                    )}
                />

                <Field.Root>
                    <DatePicker 
                        name="volunteerSince"
                        defaultValue={[timestampToDateValue(volunteer.volunteerSince)]} 
                        disabled >
                        Volunteer since
                    </DatePicker>
                    <Field.ErrorText />
                </Field.Root>
            </HStack>

            <Spacer h={4} />
            
            <HStack>
                <Spacer />
            
                <Button variant="subtle" w="30%" type="reset">Cancel</Button>
                <Button type="submit" w="30%">Submit</Button>
            </HStack>
        </form>
    )
}