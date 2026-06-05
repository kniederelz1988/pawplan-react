import React, { createContext, useContext, useState } from "react"

import { DialogueType } from "@models/enums/DialogueType"
import UserRegisterDialogue from "@components/dialogues/UserRegisterDialogue"
import UserLoginDialogue from "@components/dialogues/UserLoginDialogue"
import AppointmentBookingDialogue, { AppointmentBookingDialogueData } from "@components/dialogues/AppointmentBookingDialogue"
import ConfirmationDialogue, { ConfirmationDialogueData } from "@components/dialogues/ConfirmationDialogue"
import { AppointmentCancelDialogue } from "@components/dialogues/AppointmentCancelDialogue"
import AppointmentEditDialogue, { AppointmentEditDialogueData } from "@components/dialogues/AppointmentEditDialogue"
import DogEditDialogue, { DogEditDialogueData } from "@components/dialogues/DogEditDialogue"

type DialogueContextData = {
    openDialogue: (type: DialogueType, data?: any) => void
    closeDialogue: () => void
}

const DialogueContext = createContext<DialogueContextData>({ 
    openDialogue: (_: DialogueType) => {},
    closeDialogue: () => {}
})

type DialogueProviderProps = {
    children: React.ReactNode
}

export function DialogueProvider({ children } : DialogueProviderProps ) {
    const [dialogueType, setDialogueType] = useState<DialogueType>(DialogueType.None)
    const [dialogueData, setDialogueData] = useState<AppointmentBookingDialogueData | ConfirmationDialogueData | null>(null)

    function onOpenDialogue(type: DialogueType, data: any | null) {
        if (type == DialogueType.AppointmentBooking && (data as AppointmentBookingDialogueData) == null) {
            return
        }

        if (type == DialogueType.AppointmentEdit && (data as AppointmentEditDialogueData) == null) {
            return
        }

        if (type == DialogueType.AppointmentCancel && (data as ConfirmationDialogueData) == null) {
            return
        }

        if (type == DialogueType.DogEdit && (data as DogEditDialogueData) == null) {
            return
        }

        setDialogueType(type)
        setDialogueData(data)
    }
    function onCloseDialogue() {
        setDialogueType(DialogueType.None)
        setDialogueData(null)
    }

    return (
        <DialogueContext.Provider value={{ openDialogue: onOpenDialogue, closeDialogue: onCloseDialogue }}>
            {children}
            <UserLoginDialogue open={dialogueType == DialogueType.UserLogin} onClose={onCloseDialogue}/>
            <UserRegisterDialogue open={dialogueType == DialogueType.UserRegister} onClose={onCloseDialogue}/>
            <AppointmentBookingDialogue open={dialogueType == DialogueType.AppointmentBooking} onClose={onCloseDialogue} 
                data={dialogueData as AppointmentBookingDialogueData}
            />
            <AppointmentEditDialogue open={dialogueType == DialogueType.AppointmentEdit} onClose={onCloseDialogue}
                data={{ appointment: null }} />
            <AppointmentCancelDialogue open={dialogueType == DialogueType.AppointmentCancel} onClose={onCloseDialogue} 
                data={dialogueData as ConfirmationDialogueData}
            />
            <DogEditDialogue open={dialogueType == DialogueType.DogEdit} onClose={onCloseDialogue}
                data={dialogueData as DogEditDialogueData}
            />
        </DialogueContext.Provider>
    )
}

export const useDialogueContext = () => useContext(DialogueContext)