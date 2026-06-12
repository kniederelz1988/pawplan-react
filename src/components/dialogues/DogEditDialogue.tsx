import { useCallback } from "react";

import { CloseButton, Dialog, DialogOpenChangeDetails, Portal } from "@chakra-ui/react";
import DogForm from "@components/forms/DogForm";

import { DogModel } from "@models/DogModel";
import { useDogRepository } from "@hooks/DogHooks";

export type DogEditDialogueData = {
    dog: DogModel
}
type DogEditDialogueProps = { 
    open: boolean, 
    onClose: () => void,
    data: DogEditDialogueData
}

export default function DogEditDialogue({ open, onClose, data } : DogEditDialogueProps) {
    const { updateDog }= useDogRepository()

    const handleConfirm = useCallback(() => {
        if (!data?.dog)
            return

        updateDog(data.dog)
        onClose()
    }, [data, onClose]);
    const handleCancel = useCallback(() => {
        onClose()
    }, [data, onClose])

    const handleOpenChange = useCallback((e: DialogOpenChangeDetails) => {
        if(!e.open) {
            onClose()
        }
    }, [onClose])

    return (
        <Dialog.Root motionPreset="slide-in-bottom" open={open} onOpenChange={handleOpenChange} size="lg">
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
                            <DogForm dog={data?.dog} onSubmit={handleConfirm} onReset={handleCancel} />
                        </Dialog.Body>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}