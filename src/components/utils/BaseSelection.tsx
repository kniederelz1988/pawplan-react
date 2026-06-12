import { useCallback } from "react";
import { Portal, Select, SelectRootProps, SelectValueChangeDetails } from "@chakra-ui/react";

type BaseSelectionProps<T> = {
    value: string[]
    getLabelCallback: ((value: T) => string)
    getValueCallback: ((value: T) => string)
    onValueChanged: ((value: T[]) => void)
}

export default function BaseSelection({ collection, value, getLabelCallback, getValueCallback, onValueChanged, ...props } 
    : BaseSelectionProps<string> & Omit<SelectRootProps, "onValueChange">
) {
    const onValueChangedCallback = useCallback(onValueChanged, [onValueChanged])

    function handleValueChanged(changeDetails: SelectValueChangeDetails) {
        console.log(changeDetails.value)
        if (changeDetails.value.length != 1) {
            onValueChangedCallback([])
            return
        }

        const index = collection.items.findIndex(t => t === parseInt(changeDetails.value[0]))
        console.log(index)
        if (index == -1) {
            onValueChangedCallback([])
            return
        }

        onValueChangedCallback([collection.items[index]])
    }

    return (
        <Select.Root key={props.key} collection={collection} value={value} onValueChange={(e:any) => { console.log(e); handleValueChanged(e) }} mt="-6px">
            <Select.HiddenSelect />
            <Select.Label>
                {props.children}
            </Select.Label>
            <Select.Control>
                <Select.Trigger>
                    <Select.ValueText placeholder="Select size">
                        {value.join(", ")}
                    </Select.ValueText>
                </Select.Trigger>
                <Select.IndicatorGroup>
                    <Select.Indicator />
                </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
                <Select.Positioner>
                    <Select.Content>
                    {
                        collection.items.map((t, i) => (
                            <Select.Item key={i} item={t} >
                                {getLabelCallback(t)}
                                <Select.ItemIndicator />
                            </Select.Item>
                        ))
                    }
                    </Select.Content>
                </Select.Positioner>
            </Portal>
        </Select.Root>
    )
}