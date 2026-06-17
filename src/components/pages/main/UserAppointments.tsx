import { useEffect } from "react";

import { Container, Flex, Heading, Text } from "@chakra-ui/react";

import { useDialogueContext } from "@contexts/DialogueContext";
import { DialogueTypeEnum } from "@components/dialogues/enums/DialogueType";
import { createAppointmentCancelDialogueData } from "@components/dialogues/AppointmentCancelDialogue";
import { createAppointmentEditDialogueData } from "@components/dialogues/AppointmentEditDialogue";

import { useVolunteer } from "@repos/hooks/VolunteerHooks";
import { useVolunteerAppointments } from "@repos/hooks/AppointmentHooks";

import { Appointment } from "@models/AppointmentModel";
import { AppointmentStatusEnum } from "@models/enums/AppointmentStatus";
import { AppointmentCollection } from "@components/misc/appointments/AppointmentCollection";

import { DogModel } from "@models/DogModel";

export default function UserAppointments() {
    const dialogue = useDialogueContext()
    
    const { volunteer } = useVolunteer()
    const appointmentCollection = useVolunteerAppointments(20)

    useEffect(() => { appointmentCollection.for(volunteer) }, [volunteer])

    function onEditAppointment(appointment: Appointment) {
        const data = createAppointmentEditDialogueData(appointment.data)
        dialogue.openDialogue(DialogueTypeEnum.AppointmentEdit, data)
    }
    function onCancelAppointment(appointment: Appointment, dog: DogModel) {
        if (!volunteer?.id)
            return

        const data = createAppointmentCancelDialogueData(appointment.data, volunteer, dog)
        dialogue.openDialogue(DialogueTypeEnum.AppointmentCancel, data)
    }
    function onCompleteAppointment(appointment: Appointment, dog: DogModel) {
        if (!volunteer?.id)
            return

        const data = { appointment: appointment.data, volunteer: volunteer, dog: dog }
        dialogue.openDialogue(DialogueTypeEnum.AppointmentComplete, data)
    }

    return (
        <Flex flexDirection="column" m="auto" maxW={850}>
            <Heading justifyContent="left" w="100%" fontSize={"2xl"}>Your visits</Heading>
            <Text justifyContent="left" w="100%" fontSize={"md"} fontWeight={"light"}>
                All your scheduled and past shelter visits.
            </Text>
            
            <Container mt={4} p={0}>
                <AppointmentCollection collection={appointmentCollection}
                    isEditable={(a) => a.statusData?.status == AppointmentStatusEnum.Pending }
                    onEdit={onEditAppointment}
                    isCancelable={(a) => a.statusData?.status != AppointmentStatusEnum.Canceled && a.statusData?.status != AppointmentStatusEnum.Completed } 
                    onCancel={onCancelAppointment} 
                    isConfirmable={(a) => a.statusData?.status == AppointmentStatusEnum.Confirmed }
                    onConfirm={onCompleteAppointment}
                />
            </Container>
        </Flex>
    )
}