import { useCallback } from "react";
import { createListCollection, SelectRootProps } from "@chakra-ui/react";
import { DogSizeEnum, getSizeTitle } from "@models/enums/DogSizeEnum";
import BaseSelection from "@components/utils/BaseSelection";
import { DogGenderEnum, getGenderTitle } from "@models/enums/DogGenderEnum";

export default function DogGenderSelection({ value, onValueChanged, ...props } : {
        value: DogGenderEnum
        onValueChanged: ((value: DogGenderEnum) => void)
    } & Omit<SelectRootProps, "collection"|"value"|"onValueChange">) 
{
    const onValueChangedCallback = useCallback(onValueChanged, [onValueChanged])

    const genderCollection = createListCollection({
        items: [ DogGenderEnum.Female, DogGenderEnum.FemaleCastrated, DogGenderEnum.Male, DogGenderEnum.MaleCastrated ].map(size => size.toString())
    })

    function getLabelTitle(strValue: string) {
        return getGenderTitle(parseInt(strValue) as DogGenderEnum)
    }

    function handleValueChanged(strValue: string) {
        if(!strValue) {
            onValueChangedCallback(DogGenderEnum.Female)
            return
        }

        onValueChangedCallback(parseInt(strValue) as DogGenderEnum)
    }

    return (
        <BaseSelection
            collection={genderCollection}
            value={value.toString()} 
            onValueChanged={handleValueChanged} 
            getLabel={getLabelTitle}
            {...props} 
        />
    )
}