import { useCallback } from "react"

import { Container, Flex, Heading, Text } from "@chakra-ui/react"

import { useDialogueContext } from "@contexts/DialogueContext"
import { createAppointmentEditDialogueData } from "@components/dialogues/AppointmentEditDialogue"
import { createAppointmentCancelDialogueData } from "@components/dialogues/AppointmentCancelDialogue"
import { DialogueTypeEnum } from "@models/enums/DialogueType"
    
import { DogModel } from "@models/DogModel"

import { VolunteerRoleEnum } from "@models/enums/UserRoleType"
import { useVolunteer, useVolunteerRole } from "@hooks/VolunteerHooks"
import { useAppointmentCollection, useAppointmentRepository } from "@hooks/AppointmentHooks"

import { Appointment } from "@models/AppointmentModel"
import { AppointmentStatusEnum } from "@models/enums/AppointmentStatus"

import { RepositoryDateCompareEnum } from "@repos/enums/RepositoryDate"

import withTabs from "@components/hocs/withAppointmentCollection"
import { AppointmentCategory, AppointmentCollection } from "@components/AppointmentCollection"

const AppointmentTabs = withTabs(AppointmentCollection)

export default function AdminAppointmentPage() {
    const dialogue = useDialogueContext()

    const { volunteer } = useVolunteer()
    const { role } = useVolunteerRole(volunteer)

    const { updateAppointment } = useAppointmentRepository()

    const pastCollection = useAppointmentCollection(RepositoryDateCompareEnum.Past, 5)
    const futureCollection = useAppointmentCollection(RepositoryDateCompareEnum.Future, 10)

    const onEditAppointment = useCallback((appointment: Appointment) => {
        const data = createAppointmentEditDialogueData(appointment)
        dialogue.openDialogue(DialogueTypeEnum.AppointmentEdit, data)
    }, [])

    const onConfirmAppointment = useCallback((a: Appointment) => {
        if (role != VolunteerRoleEnum.Admin)
            return

        a.metaData.status = AppointmentStatusEnum.Confirmed
        updateAppointment(a)
    }, [volunteer, role])
    const onCancelAppointment = useCallback((appointment: Appointment, dog: DogModel) => {
        if (role != VolunteerRoleEnum.Admin)
            return

        const data = createAppointmentCancelDialogueData(appointment, dog)
        dialogue.openDialogue(DialogueTypeEnum.AppointmentCancel, data)
    }, [volunteer, role])

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
            { title: "Upcoming", appointments: upcomingAppointments, cancelable: true },
            { title: "Pending", appointments: pendingAppointments, editable: true, confirmable: true, cancelable: true },
            { title: "Completed/Canceled", appointments: completedAppointments },
        ]
    }
    function createPastCategory(appointments: Appointment[]) : AppointmentCategory[] {
        return [ { title: "", appointments: appointments, editable: false, confirmable: false, cancelable: false } ]
    }
    
    return (
        <Flex flexDirection="column" m="auto" maxW={850}>
            <Heading justifyContent="left" w="100%" mb={-1}>All users</Heading>
            <Heading justifyContent="left" w="100%" fontSize="md" fontWeight="light">You can edit visits here. For admins only.</Heading>
            
            <Container mt={4} p={0}>
                <AppointmentTabs tabs={[ 
                    { 
                        value: "upcoming", 
                        triggerNode: <Text>Upcoming</Text>, 
                        collection: futureCollection, 
                        createCategories: createCategoriesByStatus
                    },
                    { 
                        value: "past", 
                        triggerNode: <Text>Past</Text>, 
                        collection: pastCollection, 
                        createCategories: createPastCategory
                    }
                ]} defaultTab="upcoming" onEdit={onEditAppointment} onConfirm={onConfirmAppointment} onCancel={onCancelAppointment} />
            </Container>
        </Flex>
    )
}