import { DialogOpenChangeDetails } from "@ark-ui/react"
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { toaster } from "@components/ui/toaster"
import { useCallback } from "react"

export type AppointmentEditDialogueData = {
    appointment: any
}
type AppointmentEditDialogueProps = { 
    open: boolean, 
    onClose: () => void,
    data: AppointmentEditDialogueData
}

export default function AppointmentEditDialogue({ open, onClose, data } : AppointmentEditDialogueProps) {
    const handleConfirm = useCallback(() => {
            toaster.create({
                title: "Your visit",
                description: ( <></> )
        })
        onClose()
    }, []);
    const handleCancel = useCallback((e: any) => {
        console.log("cancel")
        onClose()
    }, [])

    const handleOpenChange = useCallback((e: DialogOpenChangeDetails) => {
        if(!e.open) {
            onClose()
        }
    }, [])

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