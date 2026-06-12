import { useCallback, useMemo } from "react";

import BaseSelection from "@components/utils/BaseSelection";

import { AllDogGenders, DogGender } from "@models/enums/DogGender";
import { getGenderTitle } from "@models/DogModel";

type DogGenderSelectionProps = {
    values: DogGender[],
    children: React.ReactNode | React.ReactNode[]
    onValueChanged: ((value: DogGender[]) => void)
}

export default function DogGenderSelection({ values, children, onValueChanged } : DogGenderSelectionProps) 
{
    const genderItems = useMemo(() => {
        return AllDogGenders.map(t => { return { label: getGenderTitle(t), value: t.toString() } })
    }, [])

    const onValueChangedCallback = useCallback((value: string[]) => {
        onValueChanged(value.map(t => AllDogGenders[parseInt(t)]))
    }, [onValueChanged])

    return (
        <BaseSelection items={genderItems} value={values.map(t => t.toString())} onValueChanged={onValueChangedCallback}>
            {children}
        </BaseSelection>
    )
}