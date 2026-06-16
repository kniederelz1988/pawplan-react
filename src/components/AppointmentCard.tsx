import { useCallback, useMemo } from "react"
import { PiCalendar, PiCheckBold, PiClock, PiXBold } from "react-icons/pi"

import { Card, Flex, HStack, Icon, IconButton, Image, Spacer, Text } from "@chakra-ui/react"

import useDogsCollection from "@hooks/DogHooks"
import { DogModel } from "@models/DogModel"

import { Appointment } from "@models/AppointmentModel"
import AppointmentStateBadge from "@components/AppointmentStateBadge"

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
        <Card.Root key={appointment.data.id} w="100%" overflow="hidden" borderRadius={12}>
            <Card.Body gap={0} p={4}>
                <Card.Description as="div">
                    <Flex direction="row" w="100%">
                        {
                            dog &&
                                <Image w={16} h={16} borderRadius={16} src={dog.imageURL ? dog.imageURL : "https://meredith.nhcrafts.org/wp-content/uploads/dog-placeholder.jpg" } />
                        }

                        <Flex direction="column" w="100%" mx={2}>
                            <Text fontSize="md" fontWeight="bold" pt={1}>{dog?.name}</Text>
                            <Text fontSize="xs" mt={-1}>{/*dog && getBreedTitle(dog.breed)*/}</Text>
                            
                            <Flex direction="row" pt={3}>
                                <Icon size="sm" my="auto">
                                    <PiCalendar display="inline-block"/>
                                </Icon>
                                <Text fontSize="xs" h="16px" ml={1}>
                                    {appointment.data.date.toDate().toLocaleDateString(navigator.language)}
                                </Text>

                                <Icon size="sm" ml={4}>
                                    <PiClock display="inline-block" />
                                </Icon>
                                <Text fontSize="xs" h="16px" ml={1}>
                                    {appointment.data.date.toDate().toLocaleTimeString(navigator.language)}
                                </Text>
                            </Flex>
                        </Flex>

                        <Flex direction="column">
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