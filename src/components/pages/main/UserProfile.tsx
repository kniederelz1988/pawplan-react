import { useCallback, useEffect } from "react";

import { Box, Circle, Flex, Grid, GridItem, Heading, HStack, IconButton, Link, Text, VStack } from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { BiPencil } from "react-icons/bi";

import { useDialogueContext } from "@contexts/DialogueContext";
import { useAuthContext } from "@contexts/AuthContexts";

import { useVolunteer, useVolunteerRole } from "@repos/hooks/VolunteerHooks";
import { useAppointmentsFilteredByVolunteer } from "@repos/hooks/AppointmentHooks";

import { DialogueTypeEnum } from "@components/dialogues/enums/DialogueType";

import ProfileBadge from "@components/misc/profiles/ProfileBadge";

export default function UserProfile() {
    const dialogueContext = useDialogueContext()

    const { user, signOut }  = useAuthContext()
    const { volunteer, likeCounter } = useVolunteer()
    const { role } = useVolunteerRole(volunteer)

    const appointments = useAppointmentsFilteredByVolunteer(20)

    useEffect(() => {
        appointments.for(volunteer)
    }, [volunteer])
    
    const onEditUserClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();

        if (!volunteer) {
            return
        }

        dialogueContext.openDialogue(DialogueTypeEnum.UserEdit, { volunteer: volunteer })
    }, [volunteer])

    return (
        user && volunteer &&
            <Flex flexDirection="column" m="auto" maxW={850}>
                <Heading justifyContent="left" w="100%" fontSize={"2xl"}>Your profile</Heading>
                <Text justifyContent="left" w="100%" fontSize={"md"} fontWeight={"light"}>
                    Your volunteer account and activity.
                </Text>
                
                <Box bgColor={"primary"} border={"xs"} borderRadius={"3xl"} borderColor={"softAccent.fg"} boxShadow={"md"} mt={8} p={0}>
                    <Grid templateColumns="auto 1fr auto auto" gap={4} p={4}>
                        <GridItem>
                            <Circle w="80px" h="80px" fontSize={"3xl"} bgColor="accent.bg" color="accent.fg">
                                {volunteer.name.substring(0, 1).toUpperCase()}
                            </Circle>
                        </GridItem>

                        <GridItem m={"auto"} w="100%" minW={0} overflow={"clip"} gap={0}>
                            <Text fontSize="md" fontWeight="bold" w="100%" overflow={"hidden"} truncate>
                                {volunteer.name}
                                <ProfileBadge role={role}/>
                            </Text>
                            <Text fontSize="sm" w="100%" overflow={"hidden"} truncate>
                                {user.email}
                            </Text>
                        </GridItem>

                        <GridItem>
                            <Grid templateColumns={"repeat(2, 1fr)"} gap={2} p={0} display={{ base: "none", md: "grid"}}>
                                <GridItem colSpan={1} bgColor={"softAccent.bg/10"} color={"softAccent.fg"} borderRadius={"2xl"} border={"xs"} boxShadow={"sm"}>
                                    <VStack align={"center"} gap={0} p={4}>
                                        <Text fontWeight={"bold"}>
                                            {appointments.appointments.length > 20 ? "+20" : appointments.appointments.length}
                                        </Text>
                                        <Text>visits</Text>
                                    </VStack>
                                </GridItem>

                                <GridItem colSpan={1} bgColor={"softAccent.bg/10"} color={"softAccent.fg"} borderRadius={"2xl"} border={"xs"} boxShadow={"sm"}>
                                    <VStack align={"center"} gap={0} p={4}>
                                        <Text fontWeight={"bold"}>{likeCounter}</Text>
                                        <Text>favourites</Text>
                                    </VStack>
                                </GridItem>
                            </Grid>
                        </GridItem>
                            
                        <GridItem m={"auto"}>
                            <IconButton variant="subtle" borderRadius={24} onClick={onEditUserClick}>
                                <BiPencil />
                            </IconButton>
                        </GridItem>
                    </Grid>
                </Box>

                <Box bgColor={"softAccent.bg/30"} color={"softAccent.fg"} borderRadius={"3xl"} boxShadow={"md"} mt={8} p={6}>
                    <HStack alignItems="center">
                        <FaMapMarkerAlt />

                        <VStack alignItems="stretch" gap={0}>
                            <Text fontSize="md" fontWeight="bold">Pawfect Shelter</Text>
                            <Text fontSize="xs" fontWeight="light">42 Meadow Lane, Springfield</Text>
                            <Text fontSize="xs" fontWeight="light">Open Mon-Sat, 9am-5pm</Text>
                        </VStack>
                    </HStack>
                </Box>

                <Link mt={8} asChild onClick={signOut}>
                    <Text fontSize="sm" fontWeight="medium"><FiLogIn />Sign out</Text>
                </Link>
            </Flex>
    )
}