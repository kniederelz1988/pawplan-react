import React, { useCallback } from "react"
import { Timestamp } from "firebase/firestore";

import { CalendarDateTime } from "@internationalized/date";

import { CloseButton, Dialog, DialogOpenChangeDetails, Portal, Text } from "@chakra-ui/react"

import { toaster } from "@components/ui/toaster"

import { useVolunteer } from "@hooks/VolunteerHooks";

import AppointmentBookingDialogueForm from "@components/forms/AppointmentBookingDialogueForm"

import { DogModel } from "@models/DogModel"
import { dateValueToTimestamp } from "@helpers/TimeHelpers";

import { AppointmentModel, AppointmentStatusModel } from "@models/AppointmentModel";

import { AppointmentTypeEnum } from "@models/enums/AppointmentType";
import { AppointmentStatusEnum } from "@models/enums/AppointmentStatus";
import { useAppointmentRepository } from "@hooks/AppointmentHooks";


export type AppointmentBookingDialogueData = {
    dog: DogModel
}

type AppointmentBookingDialogueProps = { 
    open: boolean, 
    onClose: () => void,
    data: AppointmentBookingDialogueData
}

export default function AppointmentBookingDialogue({ open, onClose, data } : AppointmentBookingDialogueProps) {
    const { volunteer } = useVolunteer()
    const { createAppointment } = useAppointmentRepository()

    const handleConfirm = useCallback((dog: DogModel, date: CalendarDateTime) => {
        if (!volunteer?.id || !dog?.id)
            return
        
        const appointment: AppointmentModel = {
            dogId: dog.id,
            volunteerId: volunteer.id,
            createdAt: Timestamp.now(),
            date: dateValueToTimestamp(date),
            type: AppointmentTypeEnum.Walk
        }
        const appointmentState: AppointmentStatusModel = {
            status: AppointmentStatusEnum.Pending,
            updateAt: Timestamp.now(),
            updatedBy: volunteer.id
        }

        createAppointment(appointment, appointmentState)
        onClose()
    }, [data, onClose])

    const handleOpenChange = useCallback((e: DialogOpenChangeDetails) => {
        if (!e.open) {
            onClose()
        }
    }, [onClose])

    return (
        <Dialog.Root motionPreset="slide-in-bottom" open={open} onOpenChange={handleOpenChange}>
            <Portal>
                <Dialog.Backdrop onClick={onClose}/>
                <Dialog.Positioner>
                    <Dialog.Content
                        bgImage={`
                            linear-gradient(
                                rgba(255,255,255,0.6)
                            ),
                            url('${data?.dog?.imageURL ? data.dog.imageURL : "https://meredith.nhcrafts.org/wp-content/uploads/dog-placeholder.jpg"}')
                        `}
                        bgSize="cover"
                        bgPos="center"
                        bgRepeat="no-repeat"
                    >
                        <Dialog.Header p="14px">
                            <Dialog.Title>
                                {  
                                    data?.dog && 
                                        <Text>Visit with {data.dog.name}</Text> 
                                }
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            { 
                                data?.dog &&
                                    <AppointmentBookingDialogueForm dog={data?.dog} onConfirm={handleConfirm} onClose={onClose}/>
                            }
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