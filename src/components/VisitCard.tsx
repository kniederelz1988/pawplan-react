import { useCallback } from "react"
import { BiCalendar } from "react-icons/bi"
import { CiClock1 } from "react-icons/ci"
import { PiPencil, PiX } from "react-icons/pi"

import { Badge, Card, Flex, HStack, Icon, IconButton, Image, Spacer, Text } from "@chakra-ui/react"
import { useDialogueContext } from "@contexts/DialogueContext"
import { getBreedTitle } from "@models/DogBreed"
import { DogModel } from "@models/DogModel"
import { DialogueTypeEnum } from "@models/enums/DialogueType"

type AppointmentModel = {

}

type VisitCardProps = {
    appointment: AppointmentModel,
    dog: DogModel,
    editable?: boolean,
    cancelable?: boolean
}

export default function VisitCard({ appointment, dog, editable, cancelable }: VisitCardProps) {
    const dialogue = useDialogueContext()

    const handleEditVisit = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        dialogue.openDialogue(DialogueTypeEnum.AppointmentEdit, {
        })
    }, [appointment, dog])

    const handleCancelVisit = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        dialogue.openDialogue(DialogueTypeEnum.AppointmentCancel, { 
            title: "Cancel visit", 
            description: `Do you really want to cancel your visit with ${dog.name}`,
            confirm: "Yes",
            cancel: "No"
        })
    }, [appointment, dog])

    return (
        <Card.Root w="100%" overflow="hidden" borderRadius={12}>
            <Card.Body gap={0} p={4}>
                <Card.Description as="div">
                    <Flex direction="row" w="100%">
                        <Image w={16} h={16} borderRadius={16}
                            src="https://images.dog.ceo/breeds/shiba/shiba-15.jpg"
                            alt="Green double couch with wooden legs"
                        />
                        
                        <Flex direction="column" w="100%" mx={2} my="auto">
                            <Text fontSize="md" fontWeight="bold">{dog?.name}</Text>
                            <Text fontSize="xs" mt={-1}>{getBreedTitle(dog?.breed)}</Text>

                            <Flex direction="row" pt={.5}>
                                <Icon size="sm" my="auto">
                                    <BiCalendar display="inline-block"/>
                                </Icon>
                                <Text fontSize="xs" h="16px" ml={1}>
                                    Jun 15, 2026
                                </Text>

                                <Icon size="sm" ml={4}>
                                    <CiClock1 display="inline-block" />
                                </Icon>
                                <Text fontSize="xs" h="16px" ml={1}>
                                    10:00 am
                                </Text>
                            </Flex>
                        </Flex>

                        <Flex direction="column" gap={2}>
                            <Badge w={24} h={4} m="auto" justifyContent={"center"}>
                                Upcoming
                            </Badge>

                            { 
                                !editable && !cancelable 
                                    ? 
                                        <Spacer /> 
                                    : 
                                        <HStack align="end">
                                        { 
                                            editable 
                                                ?
                                                    <IconButton variant="subtle" onClick={handleEditVisit}>
                                                        <PiPencil />
                                                    </IconButton>
                                                : 
                                                    <></>
                                        }

                                        <Spacer />

                                        {
                                            cancelable 
                                                ? 
                                                    <IconButton variant="solid" onClick={handleCancelVisit}>
                                                        <PiX />
                                                    </IconButton>
                                                : 
                                                    <></>
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