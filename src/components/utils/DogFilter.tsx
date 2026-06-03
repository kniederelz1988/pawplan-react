import { Flex, HStack, Input, InputGroup } from "@chakra-ui/react";
import { DogGenderEnum } from "@models/enums/DogGenderEnum";
import { DogSizeEnum } from "@models/enums/DogSizeEnum";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import DogSizeSelection from "./DogSizeSelection";
import DogGenderSelection from "./DogGenderSelection";

type DogFilterProps = {
    onFilterChanged: () => void
}

export default function DogFilter({ onFilterChanged } : DogFilterProps) {
    const [name, setName] = useState("")
    const [size, setSize] = useState(DogSizeEnum.Big)
    const [gender, setGender] = useState(DogGenderEnum.Female)

    return (
        <Flex my={4} p={0} gap={2}>
            <InputGroup startElement={<FaMagnifyingGlass />} w="66%">
                <Input placeholder="Dog name" onChange={(e:any) => {setName(e.target.value)}} />
            </InputGroup>

            <DogSizeSelection value={size} onValueChanged={setSize}/>
            <DogGenderSelection value={gender} onValueChanged={setGender} />
        </Flex>
    )
}