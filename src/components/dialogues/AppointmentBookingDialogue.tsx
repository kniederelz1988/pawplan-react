import { useCallback } from "react"
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

import { DialogueProps } from "@contexts/providers/DialogueProvider";
import { useDialogueContext } from "@contexts/hooks/useDialogueContext";

export type AppointmentBookingDialogueData = {
    dog: DogModel
}

export default function AppointmentBookingDialogue({ open, data } 
    : DialogueProps<AppointmentBookingDialogueData>) {

    const dialogueContext = useDialogueContext()

    const { volunteer } = useVolunteer()
    const repository = useAppointmentRepository()

    const handleClose = useCallback(() => {
        dialogueContext.closeDialogue()
    }, [dialogueContext])

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
        handleClose()
    }, [volunteer, repository, handleClose])

    return (
        <DialogueBox open={open} title="Your appointment" size="xl" onClose={handleClose}>
            <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(5, 1fr)" }} gap={6}>
                <GridItem colSpan={{ base: 2, md: 2 }} alignContent={"start"}>
                    { data?.dog && <DogCard dog={data.dog} /> }
                </GridItem>

                <GridItem colSpan={{ base: 2, md: 3 }} alignContent={"center"}>
                    { data?.dog && <AppointmentForm dog={data.dog} onConfirm={handleConfirm} onClose={handleClose}/> }
                </GridItem>
            </Grid>
        </DialogueBox>
    )
}