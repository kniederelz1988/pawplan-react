import { useCallback, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

import { Flex, Input, InputGroup } from "@chakra-ui/react";
import { AllDogGenders, DogGender, DogGenderEnum } from "@models/enums/DogGender";
import { AllDogSizes, DogSize, DogSizeEnum } from "@models/enums/DogSize";

import DogSizeSelection from "@components/utils/DogSizeSelection";
import DogGenderSelection from "@components/utils/DogGenderSelection";

type DogFilterProps = {
    onFilterChanged: () => void
}

export default function DogFilter({ onFilterChanged } : DogFilterProps) {
    const [name, setName] = useState("")
    const [size, setSize] = useState<DogSize>(DogSizeEnum.Big)
    const [gender, setGender] = useState<DogGender>(DogGenderEnum.Female)

    const handleSizeValueChange = useCallback((values: DogSize[]) => {
        if (values.length != 1) return
        
        setSize(values[0])
    }, [])
    const handleGenderValueChange = useCallback((values: DogGender[]) => {
        if (values.length != 1) return
        
        setGender(values[0])
    }, [])

    return (
        <Flex my={4} p={0} gap={2}>
            <InputGroup startElement={<FaMagnifyingGlass />} w="66%">
                <Input placeholder="Dog name" onChange={(e:any) => {setName(e.target.value)}} />
            </InputGroup>

            <DogSizeSelection value={[size]} defaultValue={AllDogSizes} onValueChanged={handleSizeValueChange} />
            <DogGenderSelection value={[gender]} defaultValue={AllDogGenders} onValueChanged={handleGenderValueChange} />
        </Flex>
    )
}