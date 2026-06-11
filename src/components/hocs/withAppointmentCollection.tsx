import React from "react"
import { Tabs } from "@chakra-ui/react"

import { Appointment, PagedAppointmentCollection } from "@models/AppointmentModel"
import { AppointmentCategory, AppointmentCollectionProps } from "@components/AppointmentCollection"

type TabProps = {
    value: string,
    triggerNode: React.ReactNode,

    collection: PagedAppointmentCollection
    createCategories: (appointment: Appointment[]) => AppointmentCategory[]
}
type TabsProps = {
    tabs: TabProps[],
    defaultTab: string
}

export default function withTabs(Component : React.ComponentType<AppointmentCollectionProps>) {
    return ({ tabs, defaultTab, onEdit, onConfirm, onCancel} : TabsProps & Omit<AppointmentCollectionProps, "collection" | "pageControls" | "createCategories"> ) => {
        return (<>
            <Tabs.Root lazyMount unmountOnExit variant="line" fitted defaultValue={defaultTab}>
                <Tabs.List>
                { 
                    tabs.map(t => 
                        <Tabs.Trigger value={t.value}>
                            {t.triggerNode}
                        </Tabs.Trigger>
                    )
                }
                </Tabs.List>
                {
                    tabs.map(t => 
                        <Tabs.Content value={t.value}>
                            <Component collection={t.collection} createCategories={t.createCategories} pageControls onEdit={onEdit} onConfirm={onConfirm} onCancel={onCancel}/>
                        </Tabs.Content>
                    )
                }
            </Tabs.Root>
        </>)
    }
}