import { useCallback, useEffect, useState } from "react";
import { Button, Field, Input, Spacer, SwitchControl, SwitchHiddenInput, SwitchLabel, SwitchRoot } from "@chakra-ui/react";

import { DogModel } from "@models/DogModel";
import { DogGender } from "@models/enums/DogGender";
import { DogSize } from "@models/enums/DogSize";

import DatePicker from "@components/utils/DatePicker";
import DogSizeSelection from "@components/utils/DogSizeSelection";
import DogGenderSelection from "@components/utils/DogGenderSelection";

import { dateToDateValue, dateValueToTimestamp } from "@helpers/TimeHelpers";

export default function DogForm({ dog }: { dog: DogModel }) {
    const [name, setName] = useState(dog?.name)
    const [birthday, setBirthday] = useState(dog?.birthday)
    const [shelterDate, setShelterDate] = useState(dog?.shelterDate)

    const [adoptionDateValid, setAdoptionDateValid] = useState(dog?.adoptionDateValid)
    const [adoptionDate, setAdoptionDate] = useState(dog?.adoptionDate)

    const [breed, setBreed] = useState(dog?.breed)
    const [gender, setGender] = useState<DogGender>(dog?.gender)
    const [size, setSize] = useState<DogSize>(dog?.size)

    const [imageUrl, setImageUrl] = useState(dog?.imageUrl)

    const handleSizeValueChange = useCallback((values: DogSize[]) => {
        setSize(values[0])
    }, [])
    const handleGenderValueChange = useCallback((values: DogGender[]) => {
        if (values.length != 1) return

        setGender(values[0])
    }, [])

    useEffect(() => console.log(birthday), [birthday])

    return (
        dog &&
            <form>
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
                    <DogSizeSelection value={[size]} defaultValue={[]} onValueChanged={handleSizeValueChange}>
                        Size
                    </DogSizeSelection>
                    <Field.ErrorText />
                </Field.Root>

            <Spacer h={4} />

            <Field.Root>
                    <DogGenderSelection value={[gender]} defaultValue={[]} onValueChanged={handleGenderValueChange}>
                        Gender
                    </DogGenderSelection>
                    <Field.ErrorText />
                </Field.Root>

            <Spacer h={4} />

                <Button type="submit" w="100%">Submit</Button>
            </form>
    )
}