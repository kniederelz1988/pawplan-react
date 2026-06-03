import React, { createContext, useContext, useState } from "react"

import UserRegisterDialogue from "@components/dialogues/UserRegisterDialogue"
import { DialogueType } from "@models/enums/DialogueType"
import UserLoginDialogue from "@components/dialogues/UserLoginDialogue"
import AppointmentBookingDialogue from "@components/dialogues/AppointmentBookingDialogue"
import { DogModel } from "@models/DogModel"

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
    const [dialogueData, setDialogueData] = useState<any | null>(null)

    function onOpenDialogue(type: DialogueType, data: any | null) {
        if (type == DialogueType.AppointmentBooking && (data as DogModel) == null)
        {
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
            <AppointmentBookingDialogue 
                open={dialogueType == DialogueType.AppointmentBooking} 
                onClose={onCloseDialogue} 
                dog={dialogueData as DogModel}
            />
        </DialogueContext.Provider>
    )
}

export const useDialogueContext = () => useContext(DialogueContext)