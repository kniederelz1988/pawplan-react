import { useCallback, useMemo } from "react";

import BaseSelection from "@components/utils/BaseSelection";

import { AllDogSizes, DogSize } from "@models/enums/DogSize";
import { getSizeTitle } from "@models/DogModel";

type DogSizeSelectionProps = {
    values: DogSize[],
    children: React.ReactNode | React.ReactNode[]
    onValueChanged: ((value: DogSize[]) => void)
}

export default function DogSizeSelection({ values, children, onValueChanged } : DogSizeSelectionProps) 
{
    const sizeItems = useMemo(() => {
        return AllDogSizes.map(t => { return { label: getSizeTitle(t), value: t.toString() } })
    }, [])
    
    const onValueChangedCallback = useCallback((value: string[]) => {
        onValueChanged(value.map(t => AllDogSizes[parseInt(t)]))
    }, [onValueChanged])

    return (
        <BaseSelection items={sizeItems} value={values.map(t => t.toString())} onValueChanged={onValueChangedCallback}>
            {children}
        </BaseSelection>
    )
}