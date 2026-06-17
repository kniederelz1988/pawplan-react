import { useCallback, useEffect, useState } from "react";

import { Button, Field, HStack, Input, Spacer } from "@chakra-ui/react";
import DatePicker from "@components/utils/DatePicker";
import { VolunteerModel } from "@models/VolunteerModel";
import { dateToDateValue, dateToTimestamp, dateValueToDate, dateValueToTimestamp, timestampToDate, timestampToDateValue } from "@helpers/TimeHelpers";
import { Controller, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { volunteerEditSchema } from "../../schemas/volunteerSchemas";

type VolunteerFormProps = {
    volunteer: VolunteerModel,
    onSubmit: (v: VolunteerModel) => void,
    onReset: () => void
}

export default function VolunteerForm({ volunteer, onSubmit, onReset } : VolunteerFormProps) {
    const { handleSubmit, register, formState: { errors }, control, reset, resetField } = useForm({
        mode: "onBlur",
        reValidateMode: "onChange",
        resolver: yupResolver(volunteerEditSchema),
        defaultValues: {
            name: "",
            birthday: undefined
        }
    })

    const birthdayValue = useWatch({ name: "birthday", control: control })

    useEffect(() => {
        if (!volunteer) {
            resetField("name")
            resetField("birthday")
            return
        }

        reset({
            "name": volunteer.name,
            "birthday": timestampToDate(volunteer.birthday),
        })
    }, [volunteer])

    const handleFormSubmit = useCallback((data: any) => {
        volunteer.name = data.name
        volunteer.birthday = dateToTimestamp(data.birthday)
        console.log(volunteer)
        onSubmit(volunteer)
    }, [volunteer, onSubmit])
    const handleFormReset = useCallback((e: React.SyntheticEvent) => {
        e.preventDefault();
        onReset()
    }, [onReset])

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} onReset={handleFormReset}>
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

            <Field.Root invalid={!!errors.name}>
                <Field.Label>Name</Field.Label>
                <Input type="text" {...register("name")} placeholder="John Doe/Jane Roe" />
                <Field.ErrorText>
                    <Field.ErrorIcon />
                    {errors.name?.message}
                </Field.ErrorText>
            </Field.Root>

            <Spacer h={4} />

            <HStack align={"flex-start"}>
                <Controller name="birthday" control={control}
                    render={({ field }) => (
                        <Field.Root invalid={!!errors.birthday}>
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
                                {errors.birthday?.message}
                            </Field.ErrorText>
                        </Field.Root>
                    )}
                />

                <Field.Root>
                    <DatePicker name="volunteerSince" defaultValue={[timestampToDateValue(volunteer.volunteerSince)]} disabled>
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