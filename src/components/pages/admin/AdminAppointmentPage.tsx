import { useCallback } from "react"

import { Container, Flex, Heading, Text } from "@chakra-ui/react"

import { useDialogueContext } from "@contexts/DialogueContext"
import { createAppointmentEditDialogueData } from "@components/dialogues/AppointmentEditDialogue"
import { createAppointmentCancelDialogueData } from "@components/dialogues/AppointmentCancelDialogue"
import { DialogueTypeEnum } from "@components/dialogues/enums/DialogueType"
    
import { DogModel } from "@models/DogModel"

import { VolunteerRoleEnum } from "@models/enums/UserRoleType"
import { useVolunteer, useVolunteerRole } from "@repos/hooks/VolunteerHooks"
import { useAppointmentRepository, useAppointmentStatusCollection } from "@repos/hooks/AppointmentHooks"

import { Appointment } from "@models/AppointmentModel"
import { AppointmentStatusEnum } from "@models/enums/AppointmentStatus"

import withTabs from "@components/hocs/withAppointmentCollection"
import { AppointmentCollection } from "@components/misc/appointments/AppointmentCollection"

import { Timestamp } from "firebase/firestore"

const AppointmentTabs = withTabs(AppointmentCollection)

export default function AdminAppointmentPage() {
    const dialogue = useDialogueContext()

    const { volunteer } = useVolunteer()
    const { role } = useVolunteerRole(volunteer)

    const repository    = useAppointmentRepository()

    const confirmed     = useAppointmentStatusCollection([AppointmentStatusEnum.Confirmed], 10)
    const pending       = useAppointmentStatusCollection([AppointmentStatusEnum.Pending],   10)
    const canceled      = useAppointmentStatusCollection([AppointmentStatusEnum.Canceled],  10)
    const completed     = useAppointmentStatusCollection([AppointmentStatusEnum.Completed], 10)

    const onEditAppointment = useCallback((appointment: Appointment) => {
        const data = createAppointmentEditDialogueData(appointment.data)
        dialogue.openDialogue(DialogueTypeEnum.AppointmentEdit, data)
    }, [])

    const onConfirmAppointment = useCallback((appointment: Appointment) => {
        if (!volunteer?.id || role != VolunteerRoleEnum.Admin)
            return

        if (!appointment.data?.id)
            return

        const status = {
            appointmentId   : appointment.data.id,
            dogId           : appointment.data.dogId,
            volunteerId     : appointment.data.volunteerId,
            status          : AppointmentStatusEnum.Confirmed,
            updatedBy       : volunteer.id,
            updateAt        : Timestamp.now()
        }
        repository.updateStatus(appointment.data, status)
    }, [volunteer, role])
    const onCancelAppointment = useCallback((appointment: Appointment, dog: DogModel) => {
        if (!volunteer?.id || role != VolunteerRoleEnum.Admin)
            return

        const data = createAppointmentCancelDialogueData(appointment.data, volunteer, dog)
        dialogue.openDialogue(DialogueTypeEnum.AppointmentCancel, data)
    }, [volunteer, role])

    return (
        <Flex flexDirection="column" m="auto" maxW={850}>
            <Heading justifyContent="left" w="100%" fontSize={"2xl"}>All visits</Heading>
            <Text justifyContent="left" w="100%" fontSize={"md"} fontWeight={"light"}>You can edit visits here. For admins only.</Text>
            
            <Container mt={4} p={0}>
                <AppointmentTabs tabs={[ 
                    { 
                        value: "upcoming", 
                        triggerNode: <Text>Upcoming</Text>, 
                        collection: confirmed,
                        isEditable:     (_) => false,
                        isCancelable:   (_) => true,
                        isConfirmable:  (_) => false
                    },
                    { 
                        value: "pending", 
                        triggerNode: <Text>Pending</Text>, 
                        collection: pending,
                        isEditable:     (_) => true,
                        isCancelable:   (_) => false,
                        isConfirmable:  (_) => true
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
                ]} defaultTab="upcoming" onEdit={onEditAppointment} onConfirm={onConfirmAppointment} onCancel={onCancelAppointment} />
            </Container>
        </Flex>
    )
}