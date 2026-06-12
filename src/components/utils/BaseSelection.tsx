import { useCallback, useMemo } from "react";
import { createListCollection, Portal, Select, SelectValueChangeDetails } from "@chakra-ui/react";

type BaseSelectionItems = {
    label: string,
    value: string
}
type BaseSelectionProps = {
    items: BaseSelectionItems[]
    value: string[]
    children: React.ReactNode | React.ReactNode[]
    onValueChanged: ((value: string[]) => void)
}

export default function BaseSelection({ items, value, children, onValueChanged } 
    : BaseSelectionProps
) {
    const collection = useMemo(() => createListCollection({ items: items.map(t => t)}), [items])

    const handleValueChanged = useCallback((changeDetails: SelectValueChangeDetails) => {
        onValueChanged(changeDetails.value)
    }, [onValueChanged])

    return (
        <Select.Root collection={collection} value={value} onValueChange={handleValueChanged} mt="-6px">
            <Select.HiddenSelect />
            <Select.Label>
                {children}
            </Select.Label>
            <Select.Control>
                <Select.Trigger>
                    <Select.ValueText placeholder="Select size">
                        {
                            value.map(v => {
                                const t = collection.items.find(t => t.value == v)
                                return t?.label
                            })
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
                        collection.items.map((t, i) => (
                            <Select.Item key={i} item={t.value}>
                                {t.label}
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