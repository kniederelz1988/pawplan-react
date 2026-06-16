import { Appointment } from "@models/AppointmentModel";
import { DogModel } from "@models/DogModel";

import ConfirmationDialogue, { ConfirmationDialogueData } from "@components/dialogues/ConfirmationDialogue";
import { useAppointmentRepository } from "@hooks/AppointmentHooks";
import { AppointmentStatusEnum } from "@models/enums/AppointmentStatus";

export type AppointmentCompleteDialogueData = ConfirmationDialogueData
export function createAppointmentCompleteDialogueData(appointment: Appointment, dog: DogModel) 
    : AppointmentCompleteDialogueData {
    const repository = useAppointmentRepository()

    return { 
        title: "Complete visit", 
        description: `Do you really want to complete your visit with ${dog?.name}`,

        confirm: "Yes",
        onConfirm: () => {
            appointment.statusData.status = AppointmentStatusEnum.Completed

            repository.updateAppointment(appointment)
         },

        cancel: "No",
    }
}

const AppointmentCompleteDialogue = ConfirmationDialogue
export default AppointmentCompleteDialogue