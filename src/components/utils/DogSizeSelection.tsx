import { useCallback } from "react";
import { createListCollection, SelectRootProps } from "@chakra-ui/react";
import BaseSelection from "@components/utils/BaseSelection";
import { AllDogSizes, DogSize } from "@models/enums/DogSize";
import { getSizeTitle } from "@models/DogModel";

export default function DogSizeSelection({ value, onValueChanged, ...props } : {
        value: DogSize[],
        defaultValue: DogSize[],
        onValueChanged: ((value: DogSize[]) => void)
    } & Omit<SelectRootProps, "collection"|"value"|"defaultValue"|"onValueChange">) 
{
    const onValueChangedCallback = useCallback(onValueChanged, [onValueChanged])

    const sizeCollection = createListCollection({ items: AllDogSizes })

    function getLabelTitle(value: DogSize) {
        return getSizeTitle(value)
    }

    return (
        <BaseSelection<DogSize>
            collection={sizeCollection}
            value={value} 
            onValueChanged={onValueChangedCallback} 
            getLabel={getLabelTitle}
            {...props} 
        />
    )
}