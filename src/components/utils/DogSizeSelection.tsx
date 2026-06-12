import { useCallback } from "react";
import { createListCollection, SelectRootProps } from "@chakra-ui/react";

import BaseSelection from "@components/utils/BaseSelection";

import { AllDogSizes, DogSize } from "@models/enums/DogSize";
import { getSizeTitle } from "@models/DogModel";

type DogSizeSelectionProps = {
    value: DogSize[],
    onValueChanged: ((value: DogSize[]) => void)
}

export default function DogSizeSelection({ value, onValueChanged, ...props } 
    : DogSizeSelectionProps & Omit<SelectRootProps, "collection" | "value" | "onValueChange">
) 
{
    const sizeCollection = createListCollection({ items: AllDogSizes.map(t => t.toString() ) })

    const onValueChangedCallback = useCallback((value: string[]) => {
        const t = value.map( t => AllDogSizes[parseInt(t)])
        onValueChanged(t)
    }, [onValueChanged])

    const getLabel = useCallback((value: string) => {
        const i = parseInt(value)
        return getSizeTitle(AllDogSizes[i])
    }, [])
    const getValue = useCallback((value: string) => {
        const i = parseInt(value)
        return AllDogSizes[i].toString()
    }, [])

    return (
        <BaseSelection
            collection={sizeCollection}
            value={value.map(t => t.toString())}
            onValueChanged={onValueChangedCallback} 
            getLabelCallback={getLabel}
            getValueCallback={getValue}
            
            {...props} 
        />
    )
}