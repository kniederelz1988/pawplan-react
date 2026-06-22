import React, { useCallback } from "react"
import { Button, CloseButton, Dialog, DialogOpenChangeDetails, Heading, Portal } from "@chakra-ui/react"

import { AppointmentModel } from "@models/AppointmentModel"

import { toaster } from "@components/ui/toaster"
import DialogueBox from "@components/hocs/withDialogueBox"

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
    
    return (
        <DialogueBox open={open} title="Edit appointment" onClose={onClose}>
            {/* Form is missing, this dialogue isnt used yet, but will be in the future */}

            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleConfirm}>Submit</Button>
        </DialogueBox>
    )
}