import { useCallback } from "react";
import { createListCollection, SelectRootProps } from "@chakra-ui/react";
import { DogSizeEnum, getSizeTitle } from "@models/enums/DogSizeEnum";
import BaseSelection from "@components/utils/BaseSelection";

export default function DogSizeSelection({ value, onValueChanged, ...props } : {
        value: DogSizeEnum
        onValueChanged: ((value: DogSizeEnum) => void)
    } & Omit<SelectRootProps, "collection"|"value"|"onValueChange">) 
{
    const onValueChangedCallback = useCallback(onValueChanged, [onValueChanged])

    const sizeCollection = createListCollection({
        items: [ DogSizeEnum.Small, DogSizeEnum.Mid, DogSizeEnum.Big ].map(size => size.toString())
    })

    function getLabelTitle(strValue: string) {
        return getSizeTitle(parseInt(strValue) as DogSizeEnum)
    }

    function handleValueChanged(strValue: string) {
        if(!strValue) {
            onValueChangedCallback(DogSizeEnum.Small)
            return
        }

        onValueChangedCallback(parseInt(strValue) as DogSizeEnum)
    }

    return (
        <BaseSelection
            collection={sizeCollection}
            value={value.toString()} 
            onValueChanged={handleValueChanged} 
            getLabel={getLabelTitle}
            {...props} 
        />
    )
}