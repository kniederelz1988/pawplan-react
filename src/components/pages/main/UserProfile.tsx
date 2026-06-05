import { Badge, Box, Circle, Flex, Grid, Heading, HStack, IconButton, Link, Spacer, Text, VStack } from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { BiPencil } from "react-icons/bi";

import useAuthentification from "@hooks/useAuthentification";
import { getUserInitials } from "@helpers/UserHelpers";
import { useDialogueContext } from "@contexts/DialogueContext";
import { useCallback } from "react";
import { DialogueType } from "@models/enums/DialogueType";

export default function UserProfile() {
    const { user, signOutUser }  = useAuthentification()
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
                
                <Box borderColor="black" borderRadius={16} borderWidth="1px" mt={8} p={6} maxW={500}>
                    <HStack>
                        <Circle w="64px" h="64px" bgColor="bg.inverted" color="bg">
                            {getUserInitials(user).toUpperCase()}
                        </Circle>

                        <VStack gap={0} pl={2} w="100%">
                            <Text fontSize="md" fontWeight="bold" w="100%">
                                {
                                    user.displayName 
                                        ? user.displayName 
                                        : "NONE"
                                }
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

                <Grid templateColumns="repeat(3, 1fr)" gap={5} pt={4} maxW={500}>
                    <Box justifyContent="center" borderColor="black" borderRadius={16} borderWidth="1px" p={4}>
                        <VStack gap={0}>
                            <Text>{2}</Text>
                            <Text>total visits</Text>
                        </VStack>
                    </Box>

                    <Box justifyContent="center" borderColor="black" borderRadius={16} borderWidth="1px" p={4}>
                        <VStack gap={0}>
                            <Text>{1}</Text>
                            <Text>upcoming</Text>
                        </VStack>
                    </Box>

                    <Box justifyContent="center" borderColor="black" borderRadius={16} borderWidth="1px" p={4}>
                        <VStack gap={0}>
                            <Text>{2}</Text>
                            <Text>favourites</Text>
                        </VStack>
                    </Box>
                </Grid>

                <Box p={6} bgColor="bg.emphasized" borderRadius={16} mt={6} maxW={500}>
                    <HStack>
                        <FaMapMarkerAlt color="bg"/>

                        <Spacer w="2" />

                        <VStack w="100%" gap="0">
                            <Text fontSize="md" fontWeight="bold" w="100%">Pawfect Shelter</Text>
                            <Text fontSize="xs" fontWeight="light" w="100%">42 Meadow Lane, Springfield</Text>
                            <Text fontSize="xs" fontWeight="light" w="100%">Open Mon-Sat, 9am-5pm</Text>
                        </VStack>
                    </HStack>
                </Box>

                <Link mt={2} asChild onClick={signOutUser}>
                    <Text fontSize="sm" fontWeight="medium"><LuLogOut />Sign out</Text>
                </Link>
            </Flex>
        : <></>
    )
}