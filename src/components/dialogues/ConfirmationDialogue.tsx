import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { OpenChangeDetails } from "@zag-js/dialog"
import React, { useCallback } from "react"

export type ConfirmationDialogueData = {
    title: React.ReactNode,
    description: React.ReactNode,

    confirm: React.ReactNode,
    onConfirm: () => void,

    cancel: React.ReactNode,
    onCancel: () => void
}
type ConfirmationDialogueProps = {
    open: boolean,
    onClose: () => void,
    data: ConfirmationDialogueData,
}

export default function ConfirmationDialogue({ open, onClose, data } : ConfirmationDialogueProps) {
    const handleConfirm = useCallback((e: any) => {
        console.log("confirm")
        data?.onConfirm()
        onClose()
    }, [])
    const handleCancel = useCallback((e: any) => {
        console.log("cancel")
        data?.onCancel()
        onClose()
    }, [])
    
    const handleOpenChange = useCallback((e: OpenChangeDetails) => {
        if(!e.open) {
            handleCancel(e)
            onClose()
        }
    }, [])

    return (
        <Dialog.Root motionPreset="slide-in-bottom" open={open} onOpenChange={handleOpenChange}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header p="14px">
                            <Dialog.Title>
                                {data?.title}
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                                {data?.description}
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button variant="outline" onClick={handleCancel}>{data?.cancel}</Button>
                            <Dialog.ActionTrigger asChild>
                                <Button onClick={handleConfirm}>{data?.confirm}</Button>
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