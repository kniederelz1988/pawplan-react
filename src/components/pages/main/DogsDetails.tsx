import { useCallback, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"

import { Box, Button, Center, Flex, Grid, GridItem, Heading, HStack, Text, VStack } from "@chakra-ui/react"

import { useDialogueContext } from "@contexts/DialogueContext"
import { DialogueTypeEnum } from "@components/dialogues/enums/DialogueType"

import useDogsCollection, { useDogAppointmentCount, useDogLikeCount } from "@repos/hooks/DogHooks"
import { useDogAppointmentRatings } from "@repos/hooks/AppointmentHooks"

import { useVolunteer, useVolunteerRole } from "@repos/hooks/VolunteerHooks"
import { VolunteerRoleEnum } from "@models/enums/UserRoleType"
import DogEditButton from "@components/misc/dogs/DogEditButton"
import DogFavouriteButton from "@components/misc/dogs/DogFavouriteButton"
import DogCard from "@components/misc/dogs/DogCard"
import { AppointmentRating } from "@components/misc/appointments/AppointmentRating"
import { creatUserInsufficientRightsDialogueData } from "@components/dialogues/UserInsufficientRightsDialogue"

type DogsDetailsProps = {
}

export default function DogsDetails({ } : DogsDetailsProps) {
    const { id } = useParams<string>()
    const { dogs, filterDogsByIds } = useDogsCollection([])

    useEffect(() => {
        if (!id) {
            filterDogsByIds([])
            return
        }

        filterDogsByIds([id])
    }, [id])

    const dog = useMemo(() => {
        if (dogs.length != 1) {
            return null
        }

        return dogs[0] 
    }, [dogs])

    const likeCounter = useDogLikeCount()
    const appointmentCounter = useDogAppointmentCount()

    const ratingCollection = useDogAppointmentRatings(20)

    useEffect(() => { 
        likeCounter.for(dog)
        appointmentCounter.for(dog)
        ratingCollection.for(dog)
    }, [dog])

    const { volunteer } = useVolunteer()
    const { role } = useVolunteerRole(volunteer)

    const dialogueContext = useDialogueContext()

    const onMeetClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        
        if (!volunteer) {
            dialogueContext.openDialogue(DialogueTypeEnum.UserLogin)
            return
        }

        if (role == VolunteerRoleEnum.Observer) {
            const data = creatUserInsufficientRightsDialogueData()
            dialogueContext.openDialogue(DialogueTypeEnum.UserInsuffientRights, data)
            return
        }

        dialogueContext.openDialogue(DialogueTypeEnum.AppointmentBooking, { dog: dog })
    }, [volunteer, role, dog])

    return (
        dog &&
            <Flex flexDirection="column" m="auto" maxW={850}>
                <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(10, 1fr)"}} mt={4} p={0} gap={4}>
                    <GridItem colSpan={{ base: 1, lg: 4}}>
                        <Flex direction={"column"} bgColor={"softAccent.bg/30"} borderRadius={"3xl"} boxShadow={"md"} p={4} gap={4}>
                            <DogCard dog={dog} />

                            <Grid templateColumns={"repeat(2, 1fr)"} w="full" gap={4}>
                                <GridItem colSpan={1} bgColor={"secondary.bg"} borderColor={"secondary.fg"} borderRadius={"2xl"} borderWidth={"xs"} boxShadow={"sm"}>
                                    <VStack gap={0} m={4}>
                                        <Text fontSize={"md"} fontWeight={"bold"}>{appointmentCounter.count}</Text>
                                        <Text fontSize={"sm"}>visits</Text>
                                    </VStack>
                                </GridItem>
                            
                                <GridItem colSpan={1} bgColor={"secondary.bg"} borderColor={"secondary.fg"} borderRadius={"2xl"} borderWidth={"xs"} boxShadow={"sm"}>
                                    <VStack gap={0} m={4}>
                                        <Text fontSize={"md"} fontWeight={"bold"}>{likeCounter.count}</Text>
                                        <Text fontSize={"sm"}>favourited</Text>
                                    </VStack>
                                </GridItem>
                            </Grid>

                            <Button variant="solid" w="full" boxShadow={"md"} onClick={onMeetClick}>
                                Meet {dog.name}
                            </Button>
                        </Flex>
                    </GridItem>

                    <GridItem colSpan={{ base: 1, lg: 6}}>
                        <HStack>
                            <Heading justifyContent="left" w="100%">More about {dog?.name}</Heading>
                            
                            <DogEditButton dog={dog} />
                            <DogFavouriteButton dog={dog} />
                        </HStack>
                            
                        <Text textAlign={"justify"} whiteSpace="pre-line" mt={4}>
                            { dog?.description }
                        </Text>
                    </GridItem>
                </Grid>

                <VStack w="full" bgColor={"softAccent.bg/30"} borderRadius={"3xl"} boxShadow={"md"} m={0} mt={8} px={8} pt={4} pb={8} gap={4}>
                    <Heading w="full">Remarks about {dog.name}</Heading>
                    {   
                        ratingCollection.ratings.length > 0 
                            ? 
                                ratingCollection.ratings.map(t => 
                                    <VStack w="full" >
                                        <AppointmentRating rating={t} />
                                    </VStack>
                                )
                            :
                                <Box w="full" bgColor={"secondary.bg"} borderColor={"secondary.fg"} borderRadius={"2xl"} borderWidth={"xs"} boxShadow={"sm"} p={4}>
                                    <Center>
                                        <Text fontSize={"xs"}>No remarks yet...</Text>
                                    </Center>
                                </Box>
                            
                    }
                </VStack>
            </Flex>
    )
}