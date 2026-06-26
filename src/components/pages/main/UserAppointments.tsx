import { useEffect } from "react";

import { Container, Flex, Heading, Text } from "@chakra-ui/react";

import withTabs from "@components/hocs/withAppointmentCollection";

import { useDialogueContext } from "@contexts/DialogueContext";
import { DialogueTypeEnum } from "@components/dialogues/enums/DialogueType";
import { createAppointmentCancelDialogueData } from "@components/dialogues/AppointmentCancelDialogue";
import { createAppointmentEditDialogueData } from "@components/dialogues/AppointmentEditDialogue";

import { useVolunteer } from "@repos/hooks/VolunteerHooks";
import { useAppointmentStatusCollection } from "@repos/hooks/AppointmentHooks";

import { Appointment } from "@models/AppointmentModel";
import { AppointmentStatusEnum } from "@models/enums/AppointmentStatus";
import { AppointmentCollection } from "@components/misc/appointments/AppointmentCollection";

import { DogModel } from "@models/DogModel";

const AppointmentTabs = withTabs(AppointmentCollection)

export default function UserAppointments() {
    const dialogue = useDialogueContext()
    
    const { volunteer } = useVolunteer()

    const confirmed     = useAppointmentStatusCollection([AppointmentStatusEnum.Confirmed], 10)
    const pending       = useAppointmentStatusCollection([AppointmentStatusEnum.Pending],   10)
    const canceled      = useAppointmentStatusCollection([AppointmentStatusEnum.Canceled],  10)
    const completed     = useAppointmentStatusCollection([AppointmentStatusEnum.Completed], 10)

    useEffect(() => { 
        confirmed.for(volunteer) 
        pending.for(volunteer)
        canceled.for(volunteer)
        completed.for(volunteer)
    }, [volunteer])

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
                <AppointmentTabs tabs={[ 
                    { 
                        value: "upcoming", 
                        triggerNode: <Text>Upcoming</Text>, 
                        collection: confirmed,
                        isEditable:     (_) => false,
                        isCancelable:   (_) => true,
                        isConfirmable:  (_) => true
                    },
                    { 
                        value: "pending", 
                        triggerNode: <Text>Pending</Text>, 
                        collection: pending,
                        isEditable:     (_) => true,
                        isCancelable:   (_) => true,
                        isConfirmable:  (_) => false
                    },
                    { 
                        value: "canceled", 
                        triggerNode: <Text>Canceled</Text>, 
                        collection: canceled,
                        isEditable:     (_) => false,
                        isCancelable:   (_) => false,
                        isConfirmable:  (_) => false
                    },
                    { 
                        value: "completed", 
                        triggerNode: <Text>Completed</Text>, 
                        collection: completed,
                        isEditable:     (_) => false,
                        isCancelable:   (_) => false,
                        isConfirmable:  (_) => false
                    },
                ]} defaultTab="upcoming" onEdit={onEditAppointment} onConfirm={onCompleteAppointment} onCancel={onCancelAppointment} />
            </Container>
        </Flex>
    )
}