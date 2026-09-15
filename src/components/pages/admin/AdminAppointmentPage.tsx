import { useCallback } from "react"

import { Container, Flex, Text } from "@chakra-ui/react"

import { useDialogueContext } from "@contexts/hooks/useDialogueContext"

import { DogModel } from "@models/DogModel"

import { useLocalVolunteerRole } from "@repos/hooks/VolunteerHooks"
import { useAppointmentRepository, useAppointmentStatusCollection } from "@repos/hooks/AppointmentHooks"

import { Appointment } from "@models/AppointmentModel"
import { AppointmentStatusEnum } from "@models/enums/AppointmentStatus"

import withTabs from "@components/hocs/withAppointmentCollection"
import { AppointmentCollection } from "@components/misc/appointments/AppointmentCollection"

import { Timestamp } from "firebase/firestore"
import { PageHeading } from "@components/misc/PageHeading"
import { createAppointmentEditDialogueData } from "@components/dialogues/functions/createAppointmentEditDialogueData"
import { createAppointmentCancelDialogueData } from "@components/dialogues/functions/createAppointmentCancelDialogueData"

const AppointmentTabs = withTabs(AppointmentCollection)

export default function AdminAppointmentPage() {
    const dialogueContext = useDialogueContext()

    const { volunteer, role } = useLocalVolunteerRole()

    const repository    = useAppointmentRepository()

    const confirmed     = useAppointmentStatusCollection([AppointmentStatusEnum.Confirmed], 10)
    const pending       = useAppointmentStatusCollection([AppointmentStatusEnum.Pending],   10)
    const canceled      = useAppointmentStatusCollection([AppointmentStatusEnum.Canceled],  10)
    const completed     = useAppointmentStatusCollection([AppointmentStatusEnum.Completed], 10)

    const onEditAppointment = useCallback((appointment: Appointment) => {
        if (!appointment.data)
            return

        const data = createAppointmentEditDialogueData(appointment.data)
        dialogueContext.openDialogue({ type: "appointmentEdit", data: data })
    }, [dialogueContext])

    const onConfirmAppointment = useCallback((appointment: Appointment) => {
        if (!volunteer?.id || role != "admin")
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
    }, [volunteer, role, repository])
    const onCancelAppointment = useCallback((appointment: Appointment, dog: DogModel) => {
        if (!volunteer?.id || role != "admin")
            return

        if (!appointment.data)
            return

        const data = createAppointmentCancelDialogueData(repository.updateStatus, appointment.data, volunteer, dog)
        dialogueContext.openDialogue({ type: "appointmentCancel", data: data })
    }, [volunteer, role, repository, dialogueContext])

    return (
        <Flex flexDirection="column" m="auto" maxW={850}>
            <PageHeading>All visits</PageHeading>
            
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