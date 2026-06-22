import { Button, CloseButton, Dialog, DialogOpenChangeDetails, Heading, Portal } from "@chakra-ui/react"
import React, { useCallback } from "react"

export type ConfirmationDialogueData = {
    title: React.ReactNode,
    description: React.ReactNode,

    confirm: React.ReactNode,
    onConfirm?: () => void,

    cancel: React.ReactNode,
    onCancel?: () => void
}
type ConfirmationDialogueProps = {
    open: boolean,
    onClose: () => void,
    data: ConfirmationDialogueData,
}

export default function ConfirmationDialogue({ open, onClose, data } : ConfirmationDialogueProps) {
    const handleConfirm = useCallback((_e: React.MouseEvent) => {
        if (data?.onConfirm)
            data.onConfirm()

        onClose()
    }, [data, onClose])
    const handleCancel = useCallback((_e: React.MouseEvent) => {
        if (data?.onCancel)
            data.onCancel()

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
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header p={4}>
                            <Dialog.Title>
                                {data && <Heading px={4}>{data.title}</Heading>}
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body px={4} pt={2} pb={4}>
                                {data && data.description}
                        </Dialog.Body>
                        <Dialog.Footer px={4} pt={2} pb={4}>
                            { 
                                data?.cancel && 
                                    <Button variant="subtle" onClick={handleCancel}>{data.cancel}</Button>
                            }
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