import { Button, HStack, Spacer } from "@chakra-ui/react"
import DialogueBox from "@components/hocs/withDialogueBox"
import { useDialogueContext } from "@contexts/hooks/useDialogueContext"
import { DialogueProps } from "@contexts/providers/DialogueProvider"
import React, { useCallback, useMemo } from "react"

export type ConfirmationDialogueData = {
    title: React.ReactNode,
    description: React.ReactNode,

    confirm: React.ReactNode,
    onConfirm?: () => void,

    cancel: React.ReactNode,
    onCancel?: () => void
}

export default function ConfirmationDialogue({ open, data } 
    : DialogueProps<ConfirmationDialogueData>) {
    
    const dialogueContext = useDialogueContext()
        
    const handleClose = useCallback(() => {
        dialogueContext.closeDialogue()
    }, [dialogueContext])

    const handleConfirm = useCallback((_: React.MouseEvent) => {
        if (data?.onConfirm)
            data.onConfirm()

        handleClose()
    }, [data, handleClose])
    const handleCancel = useCallback((_: React.MouseEvent) => {
        if (data?.onCancel)
            data.onCancel()

        handleClose()
    }, [data, handleClose])
    
    const title = useMemo(() => {
        return data ? data.title : ""
    }, [data])

    return (
        <DialogueBox open={open} title={title} onClose={handleClose}>
            { data && data.description }

            <HStack pt={2}>
                <Spacer />
                { data?.cancel && <Button variant="subtle" onClick={handleCancel}>{data.cancel}</Button> }
                { data?.confirm && <Button onClick={handleConfirm}>{data?.confirm}</Button> }
            </HStack>
        </DialogueBox>
    )
}