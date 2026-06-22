import React, { useCallback } from "react"
import { Timestamp } from "firebase/firestore";

import { CalendarDateTime } from "@internationalized/date";

import { Grid, GridItem } from "@chakra-ui/react"

import { useAppointmentRepository } from "@repos/hooks/AppointmentHooks";
import { useVolunteer } from "@repos/hooks/VolunteerHooks";

import { DogModel } from "@models/DogModel"
import { AppointmentModel } from "@models/AppointmentModel";
import { AppointmentTypeEnum } from "@models/enums/AppointmentType";

import DogCard from "@components/misc/dogs/DogCard";
import AppointmentForm from "@components/forms/AppointmentForm"

import { dateValueToTimestamp } from "@helpers/TimeHelpers";
import DialogueBox from "@components/hocs/withDialogueBox";

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

    return (
        <DialogueBox open={open} title="Your appointment" size="xl" onClose={onClose}>
            <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(5, 1fr)" }} gap={6}>
                <GridItem colSpan={{ base: 2, md: 2 }} alignContent={"start"}>
                    { data?.dog && <DogCard dog={data.dog} /> }
                </GridItem>

                <GridItem colSpan={{ base: 2, md: 3 }} alignContent={"center"}>
                    { data?.dog && <AppointmentForm dog={data.dog} onConfirm={handleConfirm} onClose={onClose}/> }
                </GridItem>
            </Grid>
        </DialogueBox>
    )
}