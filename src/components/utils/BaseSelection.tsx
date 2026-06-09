import { useCallback } from "react";
import { ListCollection, Portal, Select, SelectRootProps, SelectValueChangeDetails } from "@chakra-ui/react";

export default function BaseSelection<T>({ collection, value, onValueChanged, getLabel, ...props } : {
        collection: ListCollection<T>
        value: T[]
        defaultValue: T[]
        onValueChanged: ((value: T[]) => void)
        getLabel: ((value: T) => string)
    } & Omit<SelectRootProps, "collection"|"value"|"defaultValue"|"onValueChange">
) {
    const getLabelCallback = useCallback(getLabel, [getLabel])
    const onValueChangedCallback = useCallback(onValueChanged, [onValueChanged])

    function handleValueChanged(changeDetails: SelectValueChangeDetails) {
        if (changeDetails.value.length !== 1) {
            onValueChangedCallback([])
            return
        }

        const index = collection.items.findIndex(t => t === parseInt(changeDetails.value[0]))
        if (!index) {
            onValueChangedCallback([])
            return
        }

        onValueChangedCallback([collection.items[index]])
    }

    return (
        <Select.Root key={props.key} collection={collection} value={[value.toString()]} onValueChange={handleValueChanged} mt="-6px">
            <Select.HiddenSelect />
            <Select.Label>
            {
                props.children
            }
            </Select.Label>
            <Select.Control>
                <Select.Trigger>
                    <Select.ValueText placeholder="Select size">
                        {value.map(t => getLabelCallback(t)).join(", ")}
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
                            <Select.Item item={t} key={i}>
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