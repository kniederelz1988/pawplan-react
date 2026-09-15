import { useCallback } from "react";

import { VolunteerModel } from "@models/VolunteerModel";
import VolunteerForm from "@components/forms/VolunteerForm";
import { useVolunteerRepository } from "@repos/hooks/VolunteerHooks";

import DialogueBox from "@components/hocs/withDialogueBox";
import { DialogueProps } from "@contexts/providers/DialogueProvider";
import { useDialogueContext } from "@contexts/hooks/useDialogueContext";

export type VolunteerEditDialogueData = {
    volunteer: VolunteerModel
}

export default function VolunteerEditDialogue({ open, data } 
    : DialogueProps<VolunteerEditDialogueData>) {

    const repository = useVolunteerRepository()

    const dialogueContext = useDialogueContext()
            
    const handleClose = useCallback(() => {
        dialogueContext.closeDialogue()
    }, [dialogueContext])

    const handleSubmit = useCallback((volunteer: VolunteerModel) => {
        repository.updateVolunteer(volunteer)
        handleClose()
    }, [repository, handleClose])

    return (
        <DialogueBox open={open} title="Edit volunteer" onClose={handleClose}>
            { data?.volunteer && <VolunteerForm volunteer={data.volunteer} onSubmit={handleSubmit} onReset={handleClose} /> }
        </DialogueBox>
    )
}