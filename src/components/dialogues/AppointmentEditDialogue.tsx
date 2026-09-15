import React, { useCallback } from "react"
import { Button } from "@chakra-ui/react"

import { AppointmentModel } from "@models/AppointmentModel"

import { toaster } from "@components/ui/toaster"
import DialogueBox from "@components/hocs/withDialogueBox"
import { DialogueProps } from "@contexts/providers/DialogueProvider"
import { useDialogueContext } from "@contexts/hooks/useDialogueContext"

export type AppointmentEditDialogueData = {
    appointment: AppointmentModel
}

export default function AppointmentEditDialogue({ open } : DialogueProps<AppointmentEditDialogueData>) {
    const dialogueContext = useDialogueContext()
    
    const handleClose = useCallback(() => {
        dialogueContext.closeDialogue()
    }, [dialogueContext])

    const handleConfirm = useCallback((_: React.MouseEvent) => {
        toaster.create({
            title: "Your visit",
            description: ( <></> )
        })
        handleClose()
    }, [handleClose]);
    const handleCancel = useCallback((_: React.MouseEvent) => {
        handleClose()
    }, [handleClose])
    
    return (
        <DialogueBox open={open} title="Edit appointment" onClose={handleClose}>
            {/* Form is missing, this dialogue isnt used yet, but will be in the future */}

            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleConfirm}>Submit</Button>
        </DialogueBox>
    )
}