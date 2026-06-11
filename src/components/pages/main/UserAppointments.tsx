import { Flex, Heading } from "@chakra-ui/react";

import { useDialogueContext } from "@contexts/DialogueContext";
import { DialogueTypeEnum } from "@models/enums/DialogueType";
import { createAppointmentCancelDialogueData } from "@components/dialogues/AppointmentCancelDialogue";
import { createAppointmentEditDialogueData } from "@components/dialogues/AppointmentEditDialogue";
import { createAppointmentCompleteDialogueData } from "@components/dialogues/AppointmentCompleteDialogue";

import { Appointment } from "@models/AppointmentModel";

import { useVolunteer } from "@hooks/VolunteerHooks";
import { useVolunteerAppointments } from "@hooks/AppointmentHooks";

import { DogModel } from "@models/DogModel";

import { AppointmentStatusEnum } from "@models/enums/AppointmentStatus";
import { AppointmentCategory, AppointmentCollection } from "@components/AppointmentCollection";

export default function UserAppointments() {
    const dialogue = useDialogueContext()
    
    const { volunteer } = useVolunteer()
    const appointmentCollection = useVolunteerAppointments(volunteer)

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

    function createCategoriesByStatus(appointments: Appointment[]) : AppointmentCategory[] {
        const pendingAppointments   : Appointment[] = []
        const upcomingAppointments  : Appointment[] = []
        const completedAppointments : Appointment[] = []
    
        appointments.forEach( t => {
            switch (t.metaData.status) {
                case AppointmentStatusEnum.Confirmed:
                    upcomingAppointments.push(t)
                    break
                case AppointmentStatusEnum.Pending:
                    pendingAppointments.push(t)
                    break
                case AppointmentStatusEnum.Canceled:
                case AppointmentStatusEnum.Completed:
                    completedAppointments.push(t)
            }
        })
    
        return [ 
            { title: "Upcoming", appointments: upcomingAppointments, confirmable: true, cancelable: true },
            { title: "Pending", appointments: pendingAppointments, editable: true, cancelable: true },
            { title: "Completed/Canceled", appointments: completedAppointments },
        ]
    }
    
    return (
        <Flex flexDirection="column" m="auto" maxW={850}>
            <Heading justifyContent="left" w="100%" mb={-1}>Your visits</Heading>
            <Heading justifyContent="left" w="100%" fontSize="md" fontWeight="light">
                All your scheduled and past shelter visits.
            </Heading>
            
            <AppointmentCollection collection={appointmentCollection}
                createCategories={createCategoriesByStatus}
                onEdit={onEditAppointment} 
                onCancel={onCancelAppointment} 
                onConfirm={onCompleteAppointment}
            />
        </Flex>
    )
}