import { useCallback } from "react";

import { Timestamp } from "firebase/firestore";

import { useAppointmentRepository } from "@repos/hooks/AppointmentHooks";

import { AppointmentModel } from "@models/AppointmentModel";
import { AppointmentStatusEnum } from "@models/enums/AppointmentStatus";

import { VolunteerModel } from "@models/VolunteerModel";
import { DogModel } from "@models/DogModel";

import AppointmentRatingForm from "@components/forms/AppointmentRatingForm";
import DialogueBox from "@components/hocs/withDialogueBox";
import { DialogueProps } from "@contexts/providers/DialogueProvider";
import { useDialogueContext } from "@contexts/hooks/useDialogueContext";

export type AppointmentCompleteDialogueData = {
    appointment: AppointmentModel, 
    volunteer: VolunteerModel, 
    dog: DogModel
}

export default function AppointmentCompleteDialogue({ open, data } 
    : DialogueProps<AppointmentCompleteDialogueData>) {
    
    const dialogueContext = useDialogueContext()

    const repository = useAppointmentRepository()
    
    const handleClose = useCallback(() => {
        dialogueContext.closeDialogue()
    }, [dialogueContext])

    const handleConfirm = useCallback((ratingValue: number, commentValue: string) => {
        if (!data?.appointment?.id || !data?.volunteer.id || !data?.dog.id)
                return

        const status = {
            appointmentId   : data.appointment.id,
            volunteerId     : data.volunteer.id,
            dogId           : data.dog.id,
            status          : AppointmentStatusEnum.Completed,
            updatedBy       : data.volunteer.id,
            updateAt        : Timestamp.now()
        }
        const rating = {
            appointmentId   : data.appointment.id,
            volunteerId     : data.volunteer.id,
            dogId           : data.dog.id, 
            updateAt        : Timestamp.now(),
            rating          : ratingValue,
            comment         : commentValue
        }

        repository.updateStatus(data.appointment, status)
        repository.createRating(data.appointment, rating)
        handleClose()
    }, [repository, handleClose, data])

    const handleCancel = useCallback(() => {
        handleClose()
    }, [handleClose])

    return (
        <DialogueBox open={open} title={`Complete visit with ${data?.dog && data.dog.name}`} onClose={handleClose}>
            <AppointmentRatingForm onConfirm={handleConfirm} onClose={handleCancel}/>
        </DialogueBox>
    )
}