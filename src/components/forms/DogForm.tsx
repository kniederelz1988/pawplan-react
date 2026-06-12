import { useCallback, useState } from "react";
import { Button, Field, HStack, Input, Spacer, SwitchControl, SwitchHiddenInput, SwitchLabel, SwitchRoot } from "@chakra-ui/react";

import { DogModel } from "@models/DogModel";
import { DogGender, DogGenderEnum } from "@models/enums/DogGender";
import { DogSize, DogSizeEnum } from "@models/enums/DogSize";

import DatePicker from "@components/utils/DatePicker";

import { dateToDateValue, dateValueToTimestamp } from "@helpers/TimeHelpers";
import DogSizeSelection from "@components/utils/DogSizeSelection";
import DogGenderSelection from "@components/utils/DogGenderSelection";

type DogFormProps = {
    dog: DogModel,
    onSubmit: (v: DogModel) => void,
    onReset: () => void
}

export default function DogForm({ dog, onSubmit, onReset }: DogFormProps) {
    const [name, setName] = useState(dog?.name)
    const [birthday, setBirthday] = useState(dog?.birthday)
    const [shelterDate, setShelterDate] = useState(dog?.shelterDate)

    const [adoptionDateValid, setAdoptionDateValid] = useState(dog?.adoptionDateValid)
    const [adoptionDate, setAdoptionDate] = useState(dog?.adoptionDate)

    const [breed, setBreed] = useState(dog?.breed)
    const [gender, setGender] = useState<DogGender>(dog?.gender)
    const [size, setSize] = useState<DogSize>(dog?.size)

    const [imageUrl, setImageUrl] = useState(dog?.imageURL)

    const handleSizeValueChange = useCallback((values: DogSize[]) => {
        if (values.length != 1) {
            setSize(DogSizeEnum.Small)
            return
        }

        setSize(values[0])
    }, [])
    const handleGenderValueChange = useCallback((values: DogGender[]) => {
        if (values.length != 1) {
            setGender(DogGenderEnum.Female)
            return
        }

        setGender(values[0])
    }, [])

    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault()

        dog.name = name
        dog.birthday = birthday
        dog.shelterDate = shelterDate

        dog.adoptionDateValid = adoptionDateValid
        dog.adoptionDate = adoptionDate

        dog.gender = gender
        dog.size = size

        onSubmit(dog)
    }
    function handleReset(e: React.SyntheticEvent) {
        e.preventDefault();
        onReset()
    }

    return (
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <Field.Root>
                <Field.Label>Name</Field.Label>
                <Input type="text" name="name" placeholder="Waldi" value={name} 
                    onChange={(e) => setName(e.target.value) }
                />
                <Field.ErrorText />
            </Field.Root>

            <Spacer h={2} />

            <Field.Root>
                <DatePicker value={[dateToDateValue(birthday.toDate())]}
                    onValueChange={(d) => setBirthday(dateValueToTimestamp(d.value[0])) }
                >
                    Birthday
                </DatePicker>
                <Field.ErrorText />
            </Field.Root>

            <Spacer h={4} />

            <Field.Root>
                <DatePicker value={[dateToDateValue(shelterDate.toDate())]}
                    onValueChange={(d) => setShelterDate(dateValueToTimestamp(d.value[0])) }
                >
                    Sheltered date
                </DatePicker>
                <Field.ErrorText />
            </Field.Root>

            <Spacer h={4} />

            <Field.Root>
                <SwitchRoot onCheckedChange={t => setAdoptionDateValid(t.checked)}>
                    <SwitchHiddenInput />
                    <SwitchControl />
                    <SwitchLabel>Was adopted</SwitchLabel>
                </SwitchRoot>

                <DatePicker value={[dateToDateValue(adoptionDate.toDate())]}
                    onValueChange={(d) => setAdoptionDate(dateValueToTimestamp(d.value[0])) }
                    {...(adoptionDateValid ? {} : {"disabled": true})}
                >
                    Adoption date
                </DatePicker>
                <Field.ErrorText />
            </Field.Root>

            <Spacer h={4} />
            
            <Field.Root>
                <DogSizeSelection values={[size]} onValueChanged={handleSizeValueChange}>
                    Size
                </DogSizeSelection>
                <Field.ErrorText />
            </Field.Root>

            <Spacer h={4} />

            <Field.Root>
                <DogGenderSelection values={[gender]} onValueChanged={handleGenderValueChange}>
                    Gender
                </DogGenderSelection>
                <Field.ErrorText />
            </Field.Root>

            <Spacer h={4} />
            
            <HStack>
                <Spacer />
            
                <Button variant="outline" type="reset">Cancel</Button>
                <Button type="submit">Submit</Button>
            </HStack>
        </form>
    )
}