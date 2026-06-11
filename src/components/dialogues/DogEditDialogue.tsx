import { Button, CloseButton, Dialog, DialogOpenChangeDetails, Portal } from "@chakra-ui/react";
import DogForm from "@components/forms/DogForm";
import { toaster } from "@components/ui/toaster";
import { DogModel } from "@models/DogModel";
import { useCallback } from "react";

export type DogEditDialogueData = {
    dog: DogModel
}
type DogEditDialogueProps = { 
    open: boolean, 
    onClose: () => void,
    data: DogEditDialogueData
}

export default function DogEditDialogue({ open, onClose, data } : DogEditDialogueProps) {
    
    const handleConfirm = useCallback(() => {
            toaster.create({
                title: "Done",
                description: ( <></> )
        })
        onClose()
    }, [data, onClose]);
    const handleCancel = useCallback((e: any) => {
        console.log("cancel")
        onClose()
    }, [data, onClose])

    const handleOpenChange = useCallback((e: DialogOpenChangeDetails) => {
        if(!e.open) {
            onClose()
        }
    }, [onClose])

    return (
        <Dialog.Root motionPreset="slide-in-bottom" open={open} onOpenChange={handleOpenChange} size="cover">
            <Portal>
                <Dialog.Backdrop onClick={onClose}/>
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header p="14px">
                            <Dialog.Title>
                                Edit dog
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <DogForm dog={data?.dog} />
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