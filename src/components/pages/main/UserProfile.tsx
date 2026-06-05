import { useCallback } from "react";
import { Badge, Box, Circle, Flex, Grid, GridItem, Heading, HStack, IconButton, Link, Text, VStack } from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { BiPencil } from "react-icons/bi";

import { getUserInitials, getUserName } from "@helpers/UserHelpers";

import { useAuthContext } from "@contexts/AuthContexts";
import { useDialogueContext } from "@contexts/DialogueContext";

import { DialogueType } from "@models/enums/DialogueType";

export default function UserProfile() {
    const { user, signOut }  = useAuthContext()
    const dialogueContext = useDialogueContext()

    const onEditUserClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();

        dialogueContext.openDialogue(DialogueType.UserEdit, { })
    }, [user])

    return (
        user ?
            <Flex flexDirection="column" m="auto" maxW={850}>
                <Heading justifyContent="left" w="100%" mb={-1}>Your profile</Heading>
                <Heading justifyContent="left" w="100%" fontSize="md" fontWeight="light">Your volunteer account and activity.</Heading>
                
                <Box borderColor="black" borderRadius={16} borderWidth="1px" mt={8} p={6}>
                    <HStack>
                        <Circle w="64px" h="64px" bgColor="Highlight" color="HighlightText">
                            {getUserInitials(user).toUpperCase()}
                        </Circle>

                        <VStack gap={0} pl={2} w="100%">
                            <Text fontSize="md" fontWeight="bold" w="100%">
                                {getUserName(user)}
                            </Text>
                            <Text fontSize="sm" w="100%">{user.email}</Text>
                            <Flex w="100%" pt={1}>
                                <Badge>
                                    Volunteer
                                </Badge>
                            </Flex> 
                        </VStack>

                        <IconButton variant="subtle" borderRadius={24} onClick={onEditUserClick}>
                            <BiPencil />
                        </IconButton>
                    </HStack>
                </Box>

                <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={4} mt={8} >
                    <GridItem colSpan={1} justifyContent="center" borderColor="black" borderRadius={16} borderWidth="1px" p={4}>
                        <VStack gap={0}>
                            <Text>{2}</Text>
                            <Text>total visits</Text>
                        </VStack>
                    </GridItem>

                    <GridItem colSpan={1} justifyContent="center" borderColor="black" borderRadius={16} borderWidth="1px" p={4}>
                        <VStack gap={0}>
                            <Text>{1}</Text>
                            <Text>upcoming</Text>
                        </VStack>
                    </GridItem>

                    <GridItem colSpan={2} justifyContent="center" borderColor="black" borderRadius={16} borderWidth="1px" p={4}>
                        <VStack gap={0}>
                            <Text>{2}</Text>
                            <Text>favourites</Text>
                        </VStack>
                    </GridItem>
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
        : <></>
    )
}