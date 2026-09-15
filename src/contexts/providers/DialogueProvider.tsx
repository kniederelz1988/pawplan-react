import { useState } from "react"

import { DialogueContext, DialogueParameter } from "@contexts/DialogueContext"

import AppointmentBookingDialogue from "@components/dialogues/AppointmentBookingDialogue"
import AppointmentCancelDialogue from "@components/dialogues/AppointmentCancelDialogue"
import AppointmentCompleteDialogue from "@components/dialogues/AppointmentCompleteDialogue"
import AppointmentEditDialogue from "@components/dialogues/AppointmentEditDialogue"
import DogAddDialogue from "@components/dialogues/DogAddDialogue"
import DogEditDialogue from "@components/dialogues/DogEditDialogue"
import UserInsufficientRightsDialogue from "@components/dialogues/UserInsufficientRightsDialogue"
import UserLoginDialogue from "@components/dialogues/UserLoginDialogue"
import UserRegisterDialogue from "@components/dialogues/UserRegisterDialogue"
import VolunteerEditDialogue from "@components/dialogues/VolunteerEditDialogue"

type DialogueProviderProps = {
    children: React.ReactNode
}
export type DialogueProps<D> = { 
    open: boolean,
    data?: D | null
}

export function DialogueProvider({ children } : DialogueProviderProps ) {
    const [dialogueParameter, setDialogueParameter] = useState<DialogueParameter>({type: "none"})

    function onOpenDialogue(parameter: DialogueParameter) {
        setDialogueParameter(parameter)
    }
    function onCloseDialogue() {
        console.log(dialogueParameter)
        setDialogueParameter({type: "none"})
        console.log(dialogueParameter)
    }

    return (
        <DialogueContext.Provider value={{ openDialogue: onOpenDialogue, closeDialogue: onCloseDialogue }}>
            {children}

            {
                <>
                    <UserLoginDialogue open={dialogueParameter.type == "userLogin"} />
                    <UserRegisterDialogue open={dialogueParameter.type == "userRegister"} />

                    <UserInsufficientRightsDialogue open={dialogueParameter.type == "userInsuffientRights"}
                        data={dialogueParameter.type == "userInsuffientRights" ? dialogueParameter.data : null} />

                    <AppointmentBookingDialogue open={dialogueParameter.type == "appointmentBooking"}
                        data={dialogueParameter.type == "appointmentBooking" ? dialogueParameter.data : null} />
                    <AppointmentEditDialogue open={dialogueParameter.type == "appointmentEdit" }
                        data={dialogueParameter.type == "appointmentEdit" ? dialogueParameter.data : null} />
                    <AppointmentCancelDialogue open={dialogueParameter.type == "appointmentCancel" }
                        data={dialogueParameter.type == "appointmentCancel" ? dialogueParameter.data : null} />
                    <AppointmentCompleteDialogue open={dialogueParameter.type == "appointmentComplete"}
                        data={dialogueParameter.type == "appointmentComplete" ? dialogueParameter.data : null} />
                    
                    <DogAddDialogue open={dialogueParameter.type == "dogAdd"}
                        data={dialogueParameter.type == "dogAdd" ? dialogueParameter.data : null} />
                    <DogEditDialogue open={dialogueParameter.type == "dogEdit"}
                        data={dialogueParameter.type == "dogEdit" ? dialogueParameter.data : null} />
                    
                    <VolunteerEditDialogue open={dialogueParameter.type == "userEdit"}
                        data={dialogueParameter.type == "userEdit" ? dialogueParameter.data : null} />
                </>
            }
        </DialogueContext.Provider>
    )
}