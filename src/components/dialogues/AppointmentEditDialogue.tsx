import React, { useCallback } from "react"
import { Button, CloseButton, Dialog, DialogOpenChangeDetails, Portal } from "@chakra-ui/react"

import { toaster } from "@components/ui/toaster"
import { Appointment } from "@models/AppointmentModel"

export type AppointmentEditDialogueData = {
    appointment: Appointment
}
export function createAppointmentEditDialogueData(appointment: Appointment) : AppointmentEditDialogueData {
    return { appointment: appointment }
}

type AppointmentEditDialogueProps = { 
    open: boolean, 
    onClose: () => void,
    data: AppointmentEditDialogueData
}

export default function AppointmentEditDialogue({ open, onClose, data } : AppointmentEditDialogueProps) {
    const handleConfirm = useCallback((_e: React.MouseEvent) => {
        toaster.create({
            title: "Your visit",
            description: ( <></> )
        })
        onClose()
    }, [data, onClose]);
    const handleCancel = useCallback((_e: React.MouseEvent) => {
        onClose()
    }, [data, onClose])

    const handleOpenChange = useCallback((e: DialogOpenChangeDetails) => {
        if(!e.open) {
            onClose()
        }
    }, [onClose])

    return (
        <Dialog.Root motionPreset="slide-in-bottom" open={open} onOpenChange={handleOpenChange}>
            <Portal>
                <Dialog.Backdrop onClick={onClose}/>
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header p="14px">
                            <Dialog.Title>
                                Edit appointment
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                            <Dialog.ActionTrigger asChild>
                                <Button onClick={handleConfirm}>Submit</Button>
                            </Dialog.ActionTrigger>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}