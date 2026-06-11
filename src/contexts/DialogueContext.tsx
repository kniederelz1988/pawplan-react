import React, { createContext, useContext, useState } from "react"

import { DialogueType, DialogueTypeEnum } from "@models/enums/DialogueType"

import UserRegisterDialogue from "@components/dialogues/UserRegisterDialogue"
import UserLoginDialogue from "@components/dialogues/UserLoginDialogue"
import AppointmentBookingDialogue, { AppointmentBookingDialogueData } from "@components/dialogues/AppointmentBookingDialogue"
import AppointmentCancelDialogue, { AppointmentCancelDialogueData } from "@components/dialogues/AppointmentCancelDialogue"
import AppointmentEditDialogue, { AppointmentEditDialogueData } from "@components/dialogues/AppointmentEditDialogue"
import DogEditDialogue, { DogEditDialogueData } from "@components/dialogues/DogEditDialogue"
import VolunteerEditDialogue, { VolunteerEditDialogueData } from "@components/dialogues/VolunteerEditDialogue"
import AppointmentCompleteDialogue, { AppointmentCompleteDialogueData } from "@components/dialogues/AppointmentCompleteDialogue"

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

type DialogueData =
    AppointmentBookingDialogueData |
    AppointmentCancelDialogueData | 
    AppointmentEditDialogueData | 
    DogEditDialogueData |
    VolunteerEditDialogueData |
    null

export function DialogueProvider({ children } : DialogueProviderProps ) {
    const [dialogueType, setDialogueType] = useState<DialogueType>(DialogueTypeEnum.None)
    const [dialogueData, setDialogueData] = useState<DialogueData>(null)

    function onOpenDialogue(type: DialogueType, data: any | null) {
        if (type == DialogueTypeEnum.AppointmentBooking && (data as AppointmentBookingDialogueData) == null) {
            return
        }

        if (type == DialogueTypeEnum.AppointmentEdit && (data as AppointmentEditDialogueData) == null) {
            return
        }

        if (type == DialogueTypeEnum.AppointmentCancel && (data as AppointmentBookingDialogueData) == null) {
            return
        }

        if (type == DialogueTypeEnum.AppointmentComplete && (data as AppointmentCompleteDialogueData) == null) {
            return
        }

        if (type == DialogueTypeEnum.DogEdit && (data as DogEditDialogueData) == null) {
            return
        }

        if (type == DialogueTypeEnum.UserEdit && (data as VolunteerEditDialogueData) == null) {
            return
        }

        setDialogueType(type)
        setDialogueData(data)
    }
    function onCloseDialogue() {
        setDialogueType(DialogueTypeEnum.None)
        setDialogueData(null)
    }

    return (
        <DialogueContext.Provider value={{ openDialogue: onOpenDialogue, closeDialogue: onCloseDialogue }}>
            {children}

            <UserLoginDialogue open={dialogueType == DialogueTypeEnum.UserLogin} onClose={onCloseDialogue}/>
            <UserRegisterDialogue open={dialogueType == DialogueTypeEnum.UserRegister} onClose={onCloseDialogue}/>
            
            <AppointmentBookingDialogue open={dialogueType == DialogueTypeEnum.AppointmentBooking} onClose={onCloseDialogue} 
                data={dialogueData as AppointmentBookingDialogueData}
            />
            <AppointmentEditDialogue open={dialogueType == DialogueTypeEnum.AppointmentEdit} onClose={onCloseDialogue}
                data={dialogueData as AppointmentEditDialogueData} />
            <AppointmentCancelDialogue open={dialogueType == DialogueTypeEnum.AppointmentCancel} onClose={onCloseDialogue} 
                data={dialogueData as AppointmentCancelDialogueData}
            />
            <AppointmentCompleteDialogue open={dialogueType == DialogueTypeEnum.AppointmentComplete} onClose={onCloseDialogue}
                data={dialogueData as AppointmentCompleteDialogueData}
            />
            
            <DogEditDialogue open={dialogueType == DialogueTypeEnum.DogEdit} onClose={onCloseDialogue}
                data={dialogueData as DogEditDialogueData}
            />
            
            <VolunteerEditDialogue open={dialogueType == DialogueTypeEnum.UserEdit} onClose={onCloseDialogue}
                data={dialogueData as VolunteerEditDialogueData}
            />
        </DialogueContext.Provider>
    )
}

export const useDialogueContext = () => useContext(DialogueContext)