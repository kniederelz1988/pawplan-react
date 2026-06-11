import { useCallback } from "react";
import { createListCollection, SelectRootProps } from "@chakra-ui/react";
import BaseSelection from "@components/utils/BaseSelection";
import { AllDogGenders, DogGender } from "@models/enums/DogGender";
import { getGenderTitle } from "@models/DogModel";

export default function DogGenderSelection({ value, onValueChanged, ...props } : {
        value: DogGender[],
        defaultValue: DogGender[],
        onValueChanged: ((value: DogGender[]) => void)
    } & Omit<SelectRootProps, "collection"|"value"|"defaultValue"|"onValueChange">) 
{
    const onValueChangedCallback = useCallback(onValueChanged, [onValueChanged])

    const genderCollection = createListCollection({ items: AllDogGenders })

    function getLabelTitle(value: DogGender) {
        return getGenderTitle(value)
    }

    return (
        <BaseSelection<DogGender>
            collection={genderCollection}
            value={value} 
            onValueChanged={onValueChangedCallback} 
            getLabel={getLabelTitle}
            {...props} 
        />
    )
}