import { useCallback, useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { dogFormSchema } from "@schemas/dogSchemas";

import { Button, Field, HStack, Input, Spacer, SwitchControl, SwitchHiddenInput, SwitchLabel, SwitchRoot, Textarea, VStack } from "@chakra-ui/react";

import { DogModel } from "@models/DogModel";
import { DogGender, DogGenderEnum } from "@models/enums/DogGender";
import { DogSize, DogSizeEnum } from "@models/enums/DogSize";

import DatePicker from "@components/utils/DatePicker";

import { dateToDateValue, dateToday, dateToTimestamp, dateValueToDate, timestampToDate } from "@helpers/TimeHelpers";
import DogSizeSelection from "@components/utils/DogSizeSelection";
import DogGenderSelection from "@components/utils/DogGenderSelection";

type DogFormProps = {
    dog: DogModel,
    onSubmit: (v: DogModel) => void,
    onReset: () => void
}

export default function DogForm({ dog, onSubmit, onReset }: DogFormProps) {
    const form = useForm({
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: {
            name: "",
            birthday: undefined,
            shelterday: undefined,
            adoptionDateValid: false,
            adoptionDate: dateToday(),
            gender: [DogGenderEnum.Female],
            size: [DogSizeEnum.Small],
            description: ""
        },
        resolver: yupResolver(dogFormSchema)
    })

    const [breed, setBreed] = useState(dog?.breed)
    const [imageUrl, setImageUrl] = useState(dog?.imageURL)

    useEffect(() => {
        if (!dog) {
            form.resetField("name")
            form.resetField("birthday")
            form.resetField("adoptionDateValid")
            form.resetField("adoptionDate")
            form.resetField("gender")
            form.resetField("size")
            form.resetField("description")
            return
        }

        form.reset({
            "name": dog.name,
            "birthday": timestampToDate(dog.birthday),
            "shelterday": timestampToDate(dog.shelterDate),
            "adoptionDateValid": dog.adoptionDateValid,
            "adoptionDate": timestampToDate(dog.adoptionDate),
            "gender": [dog.gender],
            "size": [dog.size],
            "description": dog.description
        })
    }, [dog])

    const birthdayValue = useWatch({ name: "birthday", control: form.control })
    const shelterdayValue = useWatch({ name: "shelterday", control: form.control })
    const adoptionDateValue = useWatch({ name: "adoptionDate", control: form.control })

    const genderValue = useWatch({ name: "gender", control: form.control })
    const sizeValue = useWatch({ name: "size", control: form.control })

    const handleFormSubmit = useCallback((data: any) => {
        dog.name = data.name
        dog.birthday = dateToTimestamp(data.birthday)
        dog.shelterDate = dateToTimestamp(data.shelterday)

        dog.adoptionDateValid = data.adoptionDateValid
        if (dog.adoptionDateValid && data.adoptionDateValue)
            dog.adoptionDate = dateToTimestamp(data.adoptionDateValue)

        dog.gender = data.gender[0] as DogGender
        dog.size = data.size[0] as DogSize

        dog.description = data.description

        onSubmit(dog)
    }, [dog, onSubmit])
    const handleFormReset = useCallback((e: React.SyntheticEvent) => {
        e.preventDefault();

        onReset()
    }, [onReset])

    return (
        <form onSubmit={form.handleSubmit(handleFormSubmit)} onReset={handleFormReset}>
            <Field.Root invalid={!!form.formState.errors.name}>
                <Field.Label>Name</Field.Label>
                <Input type="text" placeholder="Waldi" {...form.register("name")} />
                <Field.ErrorText>
                    <Field.ErrorIcon />
                    {form.formState.errors.name?.message}
                </Field.ErrorText>
            </Field.Root>

            <Spacer h={4} />

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

            <Spacer h={4} />

            <Controller name="shelterday" control={form.control}
                render={({ field }) => (
                    <Field.Root invalid={!!form.formState.errors.shelterday}>
                        <DatePicker 
                            value={shelterdayValue ? [dateToDateValue(shelterdayValue)] : []}
                            onValueChange={(d) => {
                                if (!d.value.length) {
                                    field.onChange(null)
                                    return
                                }

                                field.onChange(dateValueToDate(d.value[0]))
                            }}
                            onBlur={() => field.onBlur()}
                        >
                            Sheltered date
                        </DatePicker>
                        <Field.ErrorText>
                            <Field.ErrorIcon />
                            {form.formState.errors.shelterday?.message}
                        </Field.ErrorText>
                    </Field.Root>
                )}
            />

            <Spacer h={4} />

            <VStack w="100%" gap={0}>
                <Field.Root>
                    <Field.Label>Adopted</Field.Label>
                    <SwitchRoot {...form.register("adoptionDateValid")} w="100%" h="40px" pl={2}>
                        <SwitchHiddenInput />
                        <SwitchControl />
                        {
                            form.getValues("adoptionDateValid") &&
                                <Controller name="adoptionDate" control={form.control}
                                    render={({ field }) => (
                                        <VStack w="100%" pl={2}>
                                            <Field.Root>
                                                <DatePicker 
                                                    value={adoptionDateValue ? [dateToDateValue(adoptionDateValue)] : []}
                                                    onValueChange={(d) => {
                                                        if (!d.value.length) {
                                                            field.onChange(null)
                                                            return
                                                        }

                                                        field.onChange(dateValueToDate(d.value[0]))
                                                    }}
                                                    onBlur={() => field.onBlur()}
                                                />
                                                <Field.ErrorText>
                                                    <Field.ErrorIcon />
                                                    {form.formState.errors.adoptionDate?.message}
                                                </Field.ErrorText>
                                            </Field.Root>
                                        </VStack>
                                    )}
                                />
                        }
                    </SwitchRoot>
                </Field.Root>
    
                
            </VStack>

            <Spacer h={4} />

            <Controller name="gender" control={form.control}
                render={({ field }) => (
                    <Field.Root invalid={!!form.formState.errors.gender}>
                        <DogGenderSelection 
                            values={genderValue as DogGender[]}
                            onValueChanged={field.onChange}
                        >
                            Gender
                        </DogGenderSelection>
                        <Field.ErrorText>
                            <Field.ErrorIcon />
                            {form.formState.errors.gender?.message}
                        </Field.ErrorText>
                    </Field.Root>
                )}
            />

            <Spacer h={4} />

            <Controller name="size" control={form.control}
                render={({ field }) => (
                    <Field.Root invalid={!!form.formState.errors.size}>
                        <DogSizeSelection 
                            values={sizeValue as DogSize[]} 
                            onValueChanged={field.onChange}
                        >
                            Size
                        </DogSizeSelection>
                        <Field.ErrorText>
                            <Field.ErrorIcon />
                            {form.formState.errors.size?.message}
                        </Field.ErrorText>
                    </Field.Root>
                )}
            />

            <Spacer h={4} />

            <Field.Root invalid={!!form.formState.errors.description}>
                <Textarea {...form.register("description")} placeholder="Write your something about the dog..." rows={6} />
                <Field.ErrorText>
                    <Field.ErrorIcon />
                    {form.formState.errors.description?.message}
                </Field.ErrorText>
            </Field.Root>

            <Spacer h={4} />

            <HStack mx={0} mt={2}>
                <Spacer />
            
                <Button variant="subtle" w="30%" type="reset">Cancel</Button>
                <Button type="submit" w="30%">Confirm</Button>
            </HStack>
        </form>
    )
}