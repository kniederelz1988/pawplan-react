import { Badge, Box, Button, Card, CloseButton, Flex, HStack, Icon, Image, Spacer, Span, Text, VStack } from "@chakra-ui/react"
import { getBreedTitle } from "@models/DogBreed"
import { DogModel } from "@models/DogModel"
import { BiCalendar } from "react-icons/bi"
import { CiClock1 } from "react-icons/ci"

type AppointmentModel = {

}

type VisitCardProps = {
    appointment: AppointmentModel,
    dog: DogModel
}

export default function VisitCard({ appointment, dog  }: VisitCardProps) {
    return (
        <Card.Root w="100%" overflow="hidden" borderRadius={12}>
            <Card.Body gap={0} p={4}>
                <Card.Description>
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
                            <Badge w={32} h={4} m="auto" justifyContent={"center"}>
                                Upcoming
                            </Badge>

                            <Button variant="solid" h={8}>
                                Cancel
                            </Button>
                        </Flex>
                    </Flex>
                </Card.Description>
            </Card.Body>
        </Card.Root>
    )
}