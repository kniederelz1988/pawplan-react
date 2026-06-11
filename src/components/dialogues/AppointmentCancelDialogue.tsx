import { Appointment } from "@models/AppointmentModel";
import { DogModel } from "@models/DogModel";

import ConfirmationDialogue, { ConfirmationDialogueData } from "@components/dialogues/ConfirmationDialogue";
import { useAppointmentRepository } from "@hooks/AppointmentHooks";
import { AppointmentStatusEnum } from "@models/enums/AppointmentStatus";

export type AppointmentCancelDialogueData = ConfirmationDialogueData
export function createAppointmentCancelDialogueData(appointment: Appointment, dog: DogModel) 
    : AppointmentCancelDialogueData {
    const repository = useAppointmentRepository()

    return { 
        title: "Cancel visit", 
        description: `Do you really want to cancel your visit with ${dog?.name}`,

        confirm: "Yes",
        onConfirm: () => { 
            appointment.metaData.status = AppointmentStatusEnum.Canceled

            repository.updateAppointment(appointment)
        },

        cancel: "No",
    }
}

const AppointmentCancelDialogue = ConfirmationDialogue
export default AppointmentCancelDialogue