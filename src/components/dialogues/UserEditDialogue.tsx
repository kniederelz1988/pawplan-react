import { Button, CloseButton, Dialog, DialogOpenChangeDetails, Portal } from "@chakra-ui/react";
import { toaster } from "@components/ui/toaster";
import { useCallback } from "react";

export type UserEditDialogueData = {
}
type UserEditDialogueProps = { 
    open: boolean, 
    onClose: () => void,
    data: UserEditDialogueData
}

export default function UserEditDialogue({ open, onClose, data } : UserEditDialogueProps) {
    const handleConfirm = useCallback(() => {
            toaster.create({
                title: "Done",
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
        <Dialog.Root motionPreset="slide-in-bottom" open={open} onOpenChange={handleOpenChange} size="cover">
            <Portal>
                <Dialog.Backdrop onClick={onClose}/>
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header p="14px">
                            <Dialog.Title>
                                Edit user
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