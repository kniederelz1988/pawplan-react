import React from "react"
import { Tabs } from "@chakra-ui/react"

import { Appointment, PagedAppointmentCollection } from "@models/AppointmentModel"
import { AppointmentCollectionProps } from "@components/AppointmentCollection"

type TabProps = {
    value: string,
    triggerNode: React.ReactNode,

    collection: PagedAppointmentCollection,

    isEditable: (appointment: Appointment) => boolean,
    isConfirmable: (appointment: Appointment) => boolean,
    isCancelable: (appointment: Appointment) => boolean
}
type TabsProps = {
    tabs: TabProps[],
    defaultTab: string
}

export default function withTabs(Component : React.ComponentType<AppointmentCollectionProps>) {
    return ({ tabs, defaultTab, onEdit, onConfirm, onCancel} : TabsProps & Omit<AppointmentCollectionProps, "collection" | "pageControls" | "isEditable" | "isConfirmable" | "isCancelable"> ) => {
        return (
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
                            <Component 
                                collection={t.collection} 
                                isEditable={t.isEditable}       onEdit={onEdit} 
                                isConfirmable={t.isConfirmable} onConfirm={onConfirm} 
                                isCancelable={t.isCancelable}   onCancel={onCancel}
                                pageControls 
                            />
                        </Tabs.Content>
                    )
                }
            </Tabs.Root>
        )
    }
}