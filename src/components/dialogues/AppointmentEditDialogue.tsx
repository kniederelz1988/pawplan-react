import React, { useCallback } from "react"
import { Button, CloseButton, Dialog, DialogOpenChangeDetails, Heading, Portal } from "@chakra-ui/react"

import { AppointmentModel } from "@models/AppointmentModel"

import { toaster } from "@components/ui/toaster"

export type AppointmentEditDialogueData = {
    appointment: AppointmentModel
}
export function createAppointmentEditDialogueData(appointment: AppointmentModel) : AppointmentEditDialogueData {
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
                        <Dialog.Header p={4}>
                            <Dialog.Title>
                                <Heading px={4}>Edit appointment</Heading>
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body px={4} pt={2} pb={4}>
                            
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