import { useCallback } from "react";
import { createListCollection, SelectRootProps } from "@chakra-ui/react";

import BaseSelection from "@components/utils/BaseSelection";

import { AllDogGenders, DogGender } from "@models/enums/DogGender";
import { getGenderTitle } from "@models/DogModel";

export default function DogGenderSelection({ value, onValueChanged, ...props } : {
        value: DogGender[],
        onValueChanged: ((value: DogGender[]) => void)
    } & Omit<SelectRootProps, "collection" | "value" | "onValueChange">) 
{
    const genderCollection = createListCollection({ items: AllDogGenders.map(t => t.toString()) })

    const onValueChangedCallback = useCallback((value: string[]) => {
        const t = value.map( t => AllDogGenders[parseInt(t)])
        onValueChanged(t)
    }, [onValueChanged])

    const getLabel = useCallback((value: string) => {
        const i = parseInt(value)
        return getGenderTitle(AllDogGenders[i])
    }, [])
    const getValue = useCallback((value: string) => {
        const i = parseInt(value)
        return AllDogGenders[i].toString()
    }, [])
    return (
        <BaseSelection
            collection={genderCollection}
            value={value.map(t => t.toString())} 
            onValueChanged={onValueChangedCallback} 
            getLabelCallback={getLabel}
            getValueCallback={getValue}

            {...props} 
        />
    )
}