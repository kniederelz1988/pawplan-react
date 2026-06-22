import { useCallback } from "react";

import { VolunteerModel } from "@models/VolunteerModel";
import VolunteerForm from "@components/forms/VolunteerForm";
import { useVolunteerRepository } from "@repos/hooks/VolunteerHooks";

import DialogueBox from "@components/hocs/withDialogueBox";

export type VolunteerEditDialogueData = {
    volunteer: VolunteerModel
}
export function createVolunteerEditDialogueData(volunteer: VolunteerModel) : VolunteerEditDialogueData {
    return { volunteer: volunteer }
}

type VolunteerEditDialogueProps = { 
    open: boolean, 
    onClose: () => void,
    data: VolunteerEditDialogueData
}

export default function VolunteerEditDialogue({ open, onClose, data } : VolunteerEditDialogueProps) {
    const volunteerRepository = useVolunteerRepository()

    const handleSubmit = useCallback((volunteer: VolunteerModel) => {
        volunteerRepository.updateVolunteer(volunteer)
        onClose()
    }, [data, onClose]);

    return (
        <DialogueBox open={open} title="Edit volunteer" onClose={onClose}>
            { data?.volunteer && <VolunteerForm volunteer={data.volunteer} onSubmit={handleSubmit} onReset={onClose} /> }
        </DialogueBox>
    )
}