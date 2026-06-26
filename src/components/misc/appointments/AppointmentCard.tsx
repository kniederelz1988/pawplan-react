import { useCallback, useEffect, useMemo } from "react"
import { PiCalendar, PiCheckBold, PiClock, PiXBold } from "react-icons/pi"

import { Card, Flex, Heading, HStack, Icon, IconButton, Image, Spacer, Text } from "@chakra-ui/react"

import { useVolunteerById } from "@repos/hooks/VolunteerHooks"

import useDogsCollection from "@repos/hooks/DogHooks"
import { DogModel } from "@models/DogModel"

import { Appointment } from "@models/AppointmentModel"
import AppointmentStateBadge from "./AppointmentStateBadge"


type AppointmentCardProps = {
    appointment: Appointment,
    editable?: boolean,
    onEdit?: (appointment: Appointment) => void,
    confirmable?: boolean,
    onConfirm?: (appointment: Appointment, dog: DogModel) => void,
    cancelable?: boolean,
    onCancel?: (appointment: Appointment, dog: DogModel) => void
}

export default function AppointmentCard({ appointment, editable, onEdit, confirmable, onConfirm, cancelable, onCancel }: AppointmentCardProps) {
    const { dogs } = useDogsCollection([appointment.data.dogId])

    const createdBy = useVolunteerById(null)
    const updatedBy = useVolunteerById(null)

    useEffect(() => {
        createdBy.forId(appointment.data.volunteerId)
    }, [appointment.data.volunteerId])
    useEffect(() => {
        updatedBy.forId(appointment.statusData?.updatedBy ?? null)
    }, [appointment.statusData?.updatedBy])

    const dog = useMemo<DogModel | null>(() => {
        if (!dogs?.length)
            return null

        return dogs[0]
    }, [dogs])

    const handleEditAppointment = useCallback(() => {
        if (!editable || !onEdit)
            return

        onEdit(appointment)
    }, [appointment, editable])
    const handleCancelAppointment = useCallback(() => {
        if (!cancelable || !onCancel || !dog)
            return 

        onCancel(appointment, dog)
    }, [appointment, cancelable, dog])
    const handleConfirmableAppointment = useCallback(() => {
        if (!confirmable || !onConfirm || !dog)
            return 

        onConfirm(appointment, dog)
    }, [appointment, confirmable, dog])

    return (
        <Card.Root key={appointment.data.id} w="100%" overflow="hidden">
            <Card.Body gap={0} p={4}>
                <Card.Description as="div">
                    <Flex direction="row" gap={4}>
                        {
                            dog &&
                                <Image w={20} h={20} aspectRatio={1} borderRadius={16} src={dog.imageURL ? dog.imageURL : "https://meredith.nhcrafts.org/wp-content/uploads/dog-placeholder.jpg" } />
                        }

                        <Flex direction="column" w="100%">
                            <Heading fontSize="md" fontWeight="bold" lineHeight={"1.2em"}>{dog?.name}</Heading>
                            <Text fontSize="xs">{/*dog && getBreedTitle(dog.breed)*/}</Text>
                        
                            <Flex direction="row">
                                <Icon size="sm" my="auto">
                                    <PiCalendar display="inline-block"/>
                                </Icon>
                                <Text fontSize="xs" ml={1}>
                                    { appointment.data.date && appointment.data.date.toDate().toLocaleDateString(navigator.language) }
                                </Text>

                                <Icon size="sm" ml={4} my="auto">
                                    <PiClock display="inline-block" />
                                </Icon>
                                <Text fontSize="xs" ml={1}>
                                    { appointment.data.date && appointment.data.date.toDate().toLocaleTimeString(navigator.language) }
                                </Text>
                            </Flex>

                            <Spacer />

                            <Flex direction="column">
                                <Text fontSize={"xs"} lineHeight={1.3}>
                                    {
                                        createdBy.volunteer &&
                                            `Created by: ${createdBy.volunteer.name}`
                                    }
                                </Text>
                                <Text fontSize={"xs"} lineHeight={1.3}>
                                    { 
                                        appointment.statusData && 
                                            `Last update: ${appointment.statusData.updateAt.toDate().toLocaleDateString(navigator.language)}`
                                    }
                                    {
                                        updatedBy.volunteer &&
                                            ` by ${updatedBy.volunteer?.name}`
                                    }
                                </Text>
                                <Spacer h="6px" />
                            </Flex>
                        </Flex>

                        <Flex direction="column" mx={2}>
                            {appointment.statusData && <AppointmentStateBadge status={appointment.statusData.status} />}
                            
                            <Spacer />
                            { 
                                (editable || confirmable || cancelable) &&
                                    <HStack justifyContent="end">
                                    { 
                                        editable && ""
                                            /*<IconButton variant="subtle" onClick={handleEditAppointment}>
                                                <PiPencilBold />
                                            </IconButton>*/
                                    }

                                    {
                                        cancelable &&
                                            <IconButton variant="solid" colorPalette="red" onClick={handleCancelAppointment}>
                                                <PiXBold />
                                            </IconButton>
                                    }

                                    {
                                        confirmable &&
                                            <IconButton variant="solid" colorPalette="green" onClick={handleConfirmableAppointment}>
                                                <PiCheckBold />
                                            </IconButton>
                                    }
                                    </HStack>
                            }
                        </Flex>
                    </Flex>
                </Card.Description>
            </Card.Body>
        </Card.Root>
    )
}