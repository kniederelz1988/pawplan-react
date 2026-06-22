import ConfirmationDialogue, { ConfirmationDialogueData } from "@components/dialogues/ConfirmationDialogue";
import { useAppointmentRepository } from "@repos/hooks/AppointmentHooks";

import { Timestamp } from "firebase/firestore";

import { AppointmentModel } from "@models/AppointmentModel";
import { AppointmentStatusEnum } from "@models/enums/AppointmentStatus";

import { VolunteerModel } from "@models/VolunteerModel";
import { DogModel } from "@models/DogModel";

export type AppointmentCancelDialogueData = ConfirmationDialogueData
export function createAppointmentCancelDialogueData(appointment: AppointmentModel, volunteer: VolunteerModel, dog: DogModel) 
    : AppointmentCancelDialogueData {
    const repository = useAppointmentRepository()

    return { 
        title: "Cancel visit", 
        description: `Do you really want to cancel your visit with ${dog?.name}`,

        confirm: "Yes",
        onConfirm: () => {
          if (!appointment.id || !volunteer.id || !dog.id )
                return

            const status = {
                appointmentId   : appointment.id,
                volunteerId     : volunteer.id,
                dogId           :  dog.id,
                status          : AppointmentStatusEnum.Canceled,
                updateAt        : Timestamp.now(),
                updatedBy       : volunteer.id
            }
            repository.updateStatus(appointment, status)
        },

        cancel: "No",
    }
}

const AppointmentCancelDialogue = ConfirmationDialogue
export default AppointmentCancelDialogue