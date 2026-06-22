import { Box, Button, CloseButton, Dialog, DialogOpenChangeDetails, Heading, HStack, Portal, Spacer } from "@chakra-ui/react"
import DialogueBox from "@components/hocs/withDialogueBox"
import React, { useCallback, useMemo } from "react"

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

    const title = useMemo(() => {
        return data ? data.title : ""
    }, [data])

    return (
        <DialogueBox open={open} title={title} onClose={onClose}>
            { data && data.description }

            <HStack pt={2}>
                <Spacer />
                { data?.cancel && <Button variant="subtle" onClick={handleCancel}>{data.cancel}</Button> }
                { data?.confirm && <Button onClick={handleConfirm}>{data?.confirm}</Button> }
            </HStack>
        </DialogueBox>
    )
}