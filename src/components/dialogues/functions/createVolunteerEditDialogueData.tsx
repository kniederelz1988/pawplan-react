import { VolunteerModel } from "@models/VolunteerModel";
import { VolunteerEditDialogueData } from "../VolunteerEditDialogue";

export function createVolunteerEditDialogueData(volunteer: VolunteerModel) : VolunteerEditDialogueData {
    return { volunteer: volunteer }
}
