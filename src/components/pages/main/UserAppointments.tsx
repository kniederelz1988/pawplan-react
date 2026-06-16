import { useEffect } from "react";

import { Container, Flex, Heading } from "@chakra-ui/react";

import { useDialogueContext } from "@contexts/DialogueContext";
import { DialogueTypeEnum } from "@models/enums/DialogueType";
import { createAppointmentCancelDialogueData } from "@components/dialogues/AppointmentCancelDialogue";
import { createAppointmentEditDialogueData } from "@components/dialogues/AppointmentEditDialogue";
import { createAppointmentCompleteDialogueData } from "@components/dialogues/AppointmentCompleteDialogue";

import { useVolunteer } from "@hooks/VolunteerHooks";
import { useVolunteerAppointments } from "@hooks/AppointmentHooks";

import { Appointment } from "@models/AppointmentModel";
import { AppointmentStatusEnum } from "@models/enums/AppointmentStatus";
import { AppointmentCollection } from "@components/AppointmentCollection";

import { DogModel } from "@models/DogModel";

export default function UserAppointments() {
    const dialogue = useDialogueContext()
    
    const { volunteer } = useVolunteer()
    const appointmentCollection = useVolunteerAppointments(20)

    useEffect(() => { appointmentCollection.for(volunteer) }, [volunteer])

    function onEditAppointment(appointment: Appointment) {
        const data = createAppointmentEditDialogueData(appointment)
        dialogue.openDialogue(DialogueTypeEnum.AppointmentEdit, data)
    }
    function onCancelAppointment(appointment: Appointment, dog: DogModel) {
        const data = createAppointmentCancelDialogueData(appointment, dog)
        dialogue.openDialogue(DialogueTypeEnum.AppointmentCancel, data)
    }
    function onCompleteAppointment(appointment: Appointment, dog: DogModel) {
        const data = createAppointmentCompleteDialogueData(appointment, dog);
        dialogue.openDialogue(DialogueTypeEnum.AppointmentComplete, data)
    }

    return (
        <Flex flexDirection="column" m="auto" maxW={850}>
            <Heading justifyContent="left" w="100%" mb={-1}>Your visits</Heading>
            <Heading justifyContent="left" w="100%" fontSize="md" fontWeight="light">
                All your scheduled and past shelter visits.
            </Heading>
            
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