import { Circle, HStack, IconButton, Popover, Text, VStack } from "@chakra-ui/react"
import { FaUserPlus } from "react-icons/fa"
import { FiLogIn } from "react-icons/fi"
import { LuLogOut } from "react-icons/lu"

import { useAuthContext } from "@contexts/AuthContexts"
import UserLoginForm from "@components/forms/UserLoginForm"
import UserRegisterForm from "@components/forms/UserRegisterForm"

import useLocalVolunteer from "@hooks/useLocalVolunteer"

export default function UserProfileOverview() {
    const { user, signOut }  = useAuthContext()
    const volunteer = useLocalVolunteer()

    return (
        user ? (
            <HStack>
                <Circle w="36px" h="36px" bgColor="Highlight" color="HighlightText">
                    {volunteer?.name.substring(0, 1).toUpperCase()}
                </Circle>

                <VStack gap={0} px={1} w="100%">
                    <Text fontSize="xs" fontWeight="bold" w="100%">
                        {volunteer?.name}
                    </Text>
                    <Text fontSize="xs" w="100%">
                        {user.email}
                    </Text>
                </VStack>

                <IconButton variant={"subtle"} borderRadius={24} onClick={signOut}>
                    <LuLogOut />
                </IconButton>
            </HStack>
        ) : (    
            <>       
                <Popover.Root positioning={{ placement: "bottom-start" }}>
                    <Popover.Trigger asChild>
                        <IconButton bgColor={"AccentColor"} color={"AccentColorText"} borderRadius={24}>
                            <FiLogIn /> LogIn
                        </IconButton>
                    </Popover.Trigger>
                    <Popover.Positioner>
                        <Popover.Content minW="250px" borderRadius="md" p={4}>
                            <Popover.Body p={0}>
                                <UserLoginForm showRegisterLink={false} />
                            </Popover.Body>
                        </Popover.Content>
                    </Popover.Positioner>
                </Popover.Root>
                
                <Popover.Root positioning={{ placement: "bottom-start" }}>
                    <Popover.Trigger asChild>
                        <IconButton bgColor={"AccentColor"} color={"AccentColorText"} borderRadius={24}>
                            <FaUserPlus /> Register
                        </IconButton>
                    </Popover.Trigger>
                    <Popover.Positioner>
                        <Popover.Content minW="250px" borderRadius="md" p={4}>
                            <Popover.Body p={0}>
                                <UserRegisterForm showLoginHint={false} />
                            </Popover.Body>
                        </Popover.Content>
                    </Popover.Positioner>
                </Popover.Root>
            </>
        )
    )
}