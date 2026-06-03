import { ListCollection, Portal, Select, SelectRootProps, SelectValueChangeDetails } from "@chakra-ui/react";
import { useCallback } from "react";

export default function BaseSelection({ collection, value, onValueChanged, getLabel, ...props } : {
        collection: ListCollection<string>
        value: string
        onValueChanged: ((value: string) => void)
        getLabel: ((value: string) => string)
    } & Omit<SelectRootProps, "collection"|"value"|"onValueChange">
) {
    const getLabelCallback = useCallback(getLabel, [getLabel])
    const onValueChangedCallback = useCallback(onValueChanged, [onValueChanged])

    function handleValueChanged(changeDetails: SelectValueChangeDetails) {
        if (changeDetails.value.length !== 1) {
            onValueChangedCallback("")
            return
        }

        const index = collection.items.findIndex(t => t === changeDetails.value[0])
        if (!index) {
            onValueChangedCallback("")
            return
        }

        onValueChangedCallback(collection.items[index])
    }

    return (
        <Select.Root key={props.key} collection={collection} value={[value]} onValueChange={handleValueChanged} mt="-6px">
            <Select.HiddenSelect />
            <Select.Label>
            {
                props.children
            }
            </Select.Label>
            <Select.Control>
                <Select.Trigger>
                    <Select.ValueText placeholder="Select size">
                    { 
                        getLabelCallback(value)
                    }
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
                        collection.items.map((sizeStr) => (
                            <Select.Item item={sizeStr} key={sizeStr}>
                                {
                                    getLabelCallback(sizeStr)
                                }
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