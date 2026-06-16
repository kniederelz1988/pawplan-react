import React, { useCallback } from "react"
import { Timestamp } from "firebase/firestore";

import { CalendarDateTime } from "@internationalized/date";

import { CloseButton, Dialog, DialogOpenChangeDetails, Grid, GridItem, Heading, Portal } from "@chakra-ui/react"

import { useAppointmentRepository } from "@hooks/AppointmentHooks";
import { useVolunteer } from "@hooks/VolunteerHooks";

import { DogModel } from "@models/DogModel"
import { AppointmentModel } from "@models/AppointmentModel";
import { AppointmentTypeEnum } from "@models/enums/AppointmentType";

import DogCard from "@components/DogCard";
import AppointmentForm from "@components/forms/AppointmentForm"

import { dateValueToTimestamp } from "@helpers/TimeHelpers";

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
    const repository = useAppointmentRepository()

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
        repository.createAppointment(appointment)
        onClose()
    }, [data, onClose])

    const handleOpenChange = useCallback((e: DialogOpenChangeDetails) => {
        if (!e.open) {
            onClose()
        }
    }, [onClose])

    return (
        <Dialog.Root motionPreset="slide-in-bottom" open={open} onOpenChange={handleOpenChange} size={"xl"}>
            <Portal>
                <Dialog.Backdrop onClick={onClose}/>
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Body p={8} mx={4} my={8}>
                            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                                <GridItem colSpan={2} alignContent={"center"}>
                                    { data?.dog && <DogCard dog={data.dog} /> }
                                </GridItem>

                                <GridItem colSpan={3} alignContent={"center"}>
                                    <Heading pb={2}>Your appointment</Heading>
                                    { data?.dog && <AppointmentForm dog={data.dog} onConfirm={handleConfirm} onClose={onClose}/> }
                                </GridItem>
                            </Grid>
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