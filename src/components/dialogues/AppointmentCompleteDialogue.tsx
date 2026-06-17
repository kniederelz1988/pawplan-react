import { useCallback } from "react";
import { CloseButton, Dialog, DialogOpenChangeDetails, Portal } from "@chakra-ui/react";

import { Timestamp } from "firebase/firestore";

import { useAppointmentRepository } from "@repos/hooks/AppointmentHooks";

import { AppointmentModel } from "@models/AppointmentModel";
import { AppointmentStatusEnum } from "@models/enums/AppointmentStatus";

import { VolunteerModel } from "@models/VolunteerModel";
import { DogModel } from "@models/DogModel";

import AppointmentRatingForm from "@components/forms/AppointmentRatingForm";

export type AppointmentCompleteDialogueData = {
    appointment: AppointmentModel, 
    volunteer: VolunteerModel, 
    dog: DogModel
}

type AppointmentCompleteDialogueProps = { 
    open: boolean, 
    onClose: () => void,
    data: AppointmentCompleteDialogueData
}

export default function AppointmentCompleteDialogue({ open, onClose, data } : AppointmentCompleteDialogueProps) {
    const repository = useAppointmentRepository()

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
        onClose()
    }, [data, onClose]);
    const handleCancel = useCallback(() => {
        onClose()
    }, [data, onClose])

    const handleOpenChange = useCallback((e: DialogOpenChangeDetails) => {
        if(!e.open) {
            onClose()
        }
    }, [onClose])

    return (
        <Dialog.Root motionPreset="slide-in-bottom" open={open} onOpenChange={handleOpenChange}>
            <Portal>
                <Dialog.Backdrop onClick={onClose}/>
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header p="14px">
                            <Dialog.Title>
                                Complete visit with {data?.dog && data.dog.name}
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <AppointmentRatingForm onConfirm={handleConfirm} onClose={handleCancel}/>
                        </Dialog.Body>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}