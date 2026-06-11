import { useCallback } from "react";

import { Box, Circle, Flex, Grid, GridItem, Heading, HStack, IconButton, Link, Text, VStack } from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { BiPencil } from "react-icons/bi";

import { useDialogueContext } from "@contexts/DialogueContext";
import { useAuthContext } from "@contexts/AuthContexts";

import { useVolunteer, useVolunteerRole } from "@hooks/VolunteerHooks";
import { useVolunteerAppointments } from "@hooks/AppointmentHooks";

import { DialogueTypeEnum } from "@models/enums/DialogueType";

import ProfileBadge from "@components/ProfileBadge";

export default function UserProfile() {
    const dialogueContext = useDialogueContext()

    const { user, signOut }  = useAuthContext()
    const { volunteer, likeCounter } = useVolunteer()
    const { role } = useVolunteerRole(volunteer)

    const { appointments } = useVolunteerAppointments(volunteer)
    
    const onEditUserClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();

        if (!volunteer) {
            return
        }

        dialogueContext.openDialogue(DialogueTypeEnum.UserEdit, { volunteer: volunteer, enableAdminControls: true })
    }, [volunteer])

    return (
        user && volunteer &&
            <Flex flexDirection="column" m="auto" maxW={850}>
                <Heading justifyContent="left" w="100%" mb={-1}>Your profile</Heading>
                <Heading justifyContent="left" w="100%" fontSize="md" fontWeight="light">Your volunteer account and activity.</Heading>
                
                <Box borderColor="black" borderRadius={16} borderWidth="1px" mt={8} p={6}>
                    <HStack>
                        <Circle w="64px" h="64px" fontSize={"3xl"} bgColor="Highlight" color="HighlightText">
                            {volunteer.name.substring(0, 1).toUpperCase()}
                        </Circle>

                        <VStack gap={0} pl={2} w="100%">
                            <Text fontSize="md" fontWeight="bold" w="100%">
                                {volunteer.name}
                            </Text>
                            <Text fontSize="sm" w="100%">{user.email}</Text>
                            <Flex w="100%" pt={1}>
                                <ProfileBadge role={role} />
                            </Flex> 
                        </VStack>

                        <IconButton variant="subtle" borderRadius={24} onClick={onEditUserClick}>
                            <BiPencil />
                        </IconButton>
                    </HStack>
                </Box>

                <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={4} mt={8}>
                    <GridItem colSpan={{ md: 1 }} display={{ base: "none", md: "block"}}></GridItem>

                    <GridItem colSpan={1} justifyContent="center" borderColor="black" borderRadius={16} borderWidth="1px" p={4}>
                        <VStack gap={0}>
                            <Text>{appointments.length}</Text>
                            <Text>total visits</Text>
                        </VStack>
                    </GridItem>

                    <GridItem colSpan={1} justifyContent="center" borderColor="black" borderRadius={16} borderWidth="1px" p={4}>
                        <VStack gap={0}>
                            <Text>{likeCounter}</Text>
                            <Text>favourites</Text>
                        </VStack>
                    </GridItem>

                    <GridItem colSpan={{ base: 0, md: 1 }}></GridItem>
                </Grid>

                <Box bgColor="Highlight" borderRadius={16} mt={8} p={6}>
                    <HStack alignItems="center" color="HighlightText">
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