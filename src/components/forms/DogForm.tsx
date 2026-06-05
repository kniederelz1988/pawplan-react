import { useEffect, useState } from "react";
import { Button, Field, Input, Spacer, SwitchControl, SwitchHiddenInput, SwitchLabel, SwitchRoot } from "@chakra-ui/react";

import { DogModel } from "@models/DogModel";
import { DogGenderEnum } from "@models/enums/DogGenderEnum";
import { DogSizeEnum } from "@models/enums/DogSizeEnum";

import DatePicker from "@components/utils/DatePicker";
import DogSizeSelection from "@components/utils/DogSizeSelection";
import DogGenderSelection from "@components/utils/DogGenderSelection";

import { parseDate, toTimestamp } from "@helpers/TimeHelpers";

export default function DogForm({ dog }: { dog: DogModel }) {
    const [name, setName] = useState(dog?.name)
    const [birthday, setBirthday] = useState(dog?.birthday)
    const [shelterDate, setShelterDate] = useState(dog?.shelterDate)

    const [adoptionDateValid, setAdoptionDateValid] = useState(dog?.adoptionDateValid)
    const [adoptionDate, setAdoptionDate] = useState(dog?.adoptionDate)

    const [breed, setBreed] = useState(dog?.breed)
    const [gender, setGender] = useState<DogGenderEnum>(dog?.gender)
    const [size, setSize] = useState<DogSizeEnum>(dog?.size)

    const [imageUrl, setImageUrl] = useState(dog?.imageUrl)

    useEffect(() => console.log(birthday), [birthday])

    return (
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
                <DatePicker value={[parseDate(birthday.toDate())]}
                    onValueChange={(d) => setBirthday(toTimestamp(d.value[0])) }
                >
                    Birthday
                </DatePicker>
                <Field.ErrorText />
            </Field.Root>

            <Spacer h={4} />

            <Field.Root>
                <DatePicker value={[parseDate(shelterDate.toDate())]}
                    onValueChange={(d) => setShelterDate(toTimestamp(d.value[0])) }
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

                <DatePicker value={[parseDate(adoptionDate.toDate())]}
                    onValueChange={(d) => setAdoptionDate(toTimestamp(d.value[0])) }
                    {...(adoptionDateValid ? {} : {"disabled": true})}
                >
                    Adoption date
                </DatePicker>
                <Field.ErrorText />
            </Field.Root>

           <Spacer h={4} />

           <Field.Root>
                <DogSizeSelection value={size} onValueChanged={setSize}>
                    Size
                </DogSizeSelection>
                <Field.ErrorText />
            </Field.Root>

           <Spacer h={4} />

           <Field.Root>
                <DogGenderSelection value={gender} onValueChanged={setGender}>
                    Gender
                </DogGenderSelection>
                <Field.ErrorText />
            </Field.Root>

           <Spacer h={4} />

            <Button type="submit" w="100%">Submit</Button>
        </form>
    )
}