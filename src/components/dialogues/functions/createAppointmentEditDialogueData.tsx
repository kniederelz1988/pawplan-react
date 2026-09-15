import { AppointmentModel } from "@models/AppointmentModel";
import { AppointmentEditDialogueData } from "../AppointmentEditDialogue";

export function createAppointmentEditDialogueData(appointment: AppointmentModel) : AppointmentEditDialogueData {
    return { appointment: appointment }
}
