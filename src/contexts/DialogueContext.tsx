import { createContext } from "react"

import { UserInsufficientRightsDialogueData } from "@components/dialogues/UserInsufficientRightsDialogue"
import { AppointmentBookingDialogueData } from "@components/dialogues/AppointmentBookingDialogue"
import { AppointmentCancelDialogueData } from "@components/dialogues/AppointmentCancelDialogue"
import { AppointmentEditDialogueData } from "@components/dialogues/AppointmentEditDialogue"
import { AppointmentCompleteDialogueData } from "@components/dialogues/AppointmentCompleteDialogue"
import { DogAddDialogueData } from "@components/dialogues/DogAddDialogue"
import { DogEditDialogueData } from "@components/dialogues/DogEditDialogue"
import { VolunteerEditDialogueData } from "@components/dialogues/VolunteerEditDialogue"

export type DialogueParameter =
    { type: "none",                 } |
    { type: "userLogin";            } | 
    { type: "userRegister";         } |
    { type: "userInsuffientRights"; data: UserInsufficientRightsDialogueData } |
    { type: "appointmentBooking";   data: AppointmentBookingDialogueData } |
    { type: "appointmentCancel";    data: AppointmentCancelDialogueData } | 
    { type: "appointmentEdit";      data: AppointmentEditDialogueData } | 
    { type: "appointmentComplete";  data: AppointmentCompleteDialogueData } |
    { type: "dogAdd";               data: DogAddDialogueData } |
    { type: "dogEdit";              data: DogEditDialogueData } |
    { type: "userEdit";             data: VolunteerEditDialogueData }

type DialogueContextData = {
    openDialogue: (parameter: DialogueParameter) => void
    closeDialogue: () => void
}

export const DialogueContext = createContext<DialogueContextData>({ 
    openDialogue: (_: DialogueParameter) => {},
    closeDialogue: () => {}
})
