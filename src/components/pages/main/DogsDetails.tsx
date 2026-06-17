import { useCallback, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"

import { Box, Button, Center, Container, Flex, Grid, GridItem, Heading, HStack, Text, VStack } from "@chakra-ui/react"

import { useDialogueContext } from "@contexts/DialogueContext"
import { DialogueTypeEnum } from "@components/dialogues/enums/DialogueType"

import useDogsCollection from "@repos/hooks/DogHooks"
import { useDogAppointmentRatings } from "@repos/hooks/AppointmentHooks"

import { useVolunteer, useVolunteerRole } from "@repos/hooks/VolunteerHooks"
import { VolunteerRoleEnum } from "@models/enums/UserRoleType"
import DogEditButton from "@components/misc/dogs/DogEditButton"
import DogFavouriteButton from "@components/misc/dogs/DogFavouriteButton"
import DogCard from "@components/misc/dogs/DogCard"
import { AppointmentRating } from "@components/misc/appointments/AppointmentRating"

type DogsDetailsProps = {
}

export default function DogsDetails( { } : DogsDetailsProps) {
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

    const ratingCollection = useDogAppointmentRatings(20)

    useEffect(() => { ratingCollection.for(dog) }, [dog])

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
            //dialogueContext.openDialogue(DialogueTypeEnum.InsufficientRights)
            return
        }

        dialogueContext.openDialogue(DialogueTypeEnum.AppointmentBooking, { dog: dog })
    }, [volunteer, role, dog])

    return (
        dog &&
            <Flex flexDirection="column" m="auto" maxW={850}>
                <Flex p={0}>
                    <Container w="60%" p={0} pr={4} mt={4}>
                        <HStack>
                            <Heading justifyContent="left" w="100%">More about {dog?.name}</Heading>
                            
                            <DogEditButton dog={dog} />
                            <DogFavouriteButton dog={dog} />
                        </HStack>
                            
                        <Text textAlign={"justify"} mt={4}>
                            Luna is a 3-year-old mixed-breed dog with a bright personality and a heart full of love. She arrived at the shelter after being found as a stray in a local park, where she had been spotted for several days. Despite efforts to locate her owners, no one came forward, and Luna began her journey toward finding a new forever home.<br />
                            <br />
                            Since arriving at the shelter, Luna has quickly become a favorite among staff and volunteers. She greets everyone with a wagging tail and an eager smile, always ready for attention and affection. Luna enjoys daily walks, playtime with toys, and exploring new surroundings with curiosity and enthusiasm.<br />
                            <br />
                            She is friendly, intelligent, and eager to please, making her a wonderful companion for a variety of households. Luna loves spending time with people and is happiest when included in family activities. She is looking for a loving home where she can share her loyalty, affection, and joyful spirit for years to come.
                        </Text>
                    </Container>

                    <VStack w="40%" bgColor={"softAccent.bg/30"} borderRadius={"3xl"} boxShadow={"md"} mt={4} p={4} gap={4}>
                        <DogCard dog={dog} />

                        <Grid templateColumns={"repeat(2, 1fr)"} w="full" gap={4}>
                            <GridItem colSpan={1} bgColor={"secondary.bg"} borderColor={"secondary.fg"} borderRadius={"2xl"} borderWidth={"xs"} boxShadow={"sm"}>
                                <VStack gap={0} m={4}>
                                    <Text fontSize={"md"} fontWeight={"bold"}>{20}</Text>
                                    <Text fontSize={"sm"}>total visits</Text>
                                </VStack>
                            </GridItem>
                        
                            <GridItem colSpan={1} bgColor={"secondary.bg"} borderColor={"secondary.fg"} borderRadius={"2xl"} borderWidth={"xs"} boxShadow={"sm"}>
                                <VStack gap={0} m={4}>
                                    <Text fontSize={"md"} fontWeight={"bold"}>{10}</Text>
                                    <Text fontSize={"sm"}>favourited</Text>
                                </VStack>
                            </GridItem>
                        </Grid>

                        <Button variant="solid" w="full" boxShadow={"md"} onClick={onMeetClick}>Meet {dog.name}</Button>
                    </VStack>
                </Flex>

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