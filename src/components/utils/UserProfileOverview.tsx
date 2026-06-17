import { Circle, Grid, GridItem, IconButton, Popover, Text, VStack } from "@chakra-ui/react"
import { FaUserPlus } from "react-icons/fa"
import { FiLogIn } from "react-icons/fi"
import { LuLogOut } from "react-icons/lu"

import { useVolunteer } from "@repos/hooks/VolunteerHooks"

import { useAuthContext } from "@contexts/AuthContexts"
import UserLoginForm from "@components/forms/UserLoginForm"
import UserRegisterForm from "@components/forms/UserRegisterForm"

export default function UserProfileOverview() {
    const { user, signOut } = useAuthContext()
    const { volunteer } = useVolunteer()

    return (
        (user && volunteer) ? (
            <Grid templateColumns="auto 1fr auto" gap={2}>
                <GridItem>
                    <Circle w="40px" h="40px" bgColor={"accent.bg"} color={"accent.fg"}>
                        {volunteer.name.substring(0, 1).toUpperCase()}
                    </Circle>
                </GridItem>
                <GridItem m="auto" w="100%" minW={0} overflow={"clip"}>
                    <VStack gap={0}>
                        <Text w="100%" fontSize="xs" fontWeight="bold" overflow={"hidden"} truncate>
                            {volunteer.name}
                        </Text>
                        <Text w="100%" fontSize="xs" overflow={"hidden"} truncate>
                            {user.email}
                        </Text>
                    </VStack>
                </GridItem>
                <GridItem>
                    <IconButton variant={"subtle"} borderRadius={24} onClick={signOut}>
                        <LuLogOut />
                    </IconButton>
                </GridItem>
            </Grid>
        ) : (
            <>       
                <Popover.Root positioning={{ placement: "bottom-start" }}>
                    <Popover.Trigger asChild>
                        <IconButton bgColor={"accent.bg"} color={"accent.fg"} borderRadius={24} fontSize={"sm"} p={2}>
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
                        <IconButton bgColor={"accent.bg"} color={"accent.fg"} borderRadius={24} fontSize={"sm"} p={2}>
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