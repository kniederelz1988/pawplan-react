import { AppointmentCancelDialogueData } from "../AppointmentCancelDialogue"

import { Timestamp } from "firebase/firestore"

import { DogModel } from "@models/DogModel"
import { VolunteerModel } from "@models/VolunteerModel"
import { AppointmentModel, AppointmentStatusModel } from "@models/AppointmentModel"
import { AppointmentStatusEnum } from "@models/enums/AppointmentStatus"

type UpdateStatusCallbackType = (appointment: AppointmentModel, status: AppointmentStatusModel) => Promise<void>

export function createAppointmentCancelDialogueData(updateStatus: UpdateStatusCallbackType, appointment: AppointmentModel, volunteer: VolunteerModel, dog: DogModel) 
    : AppointmentCancelDialogueData {
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
            updateStatus(appointment, status)
        },

        cancel: "No",
    }
}
