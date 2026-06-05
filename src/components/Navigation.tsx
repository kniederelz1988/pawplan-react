import { Box, Button, CloseButton, Container, Drawer, HStack, Portal, Spacer, StackProps, Text, VStack } from '@chakra-ui/react';
import { FaMagnifyingGlass, FaRegCalendar, FaRegUser, FaUsers } from 'react-icons/fa6';
import { FiMenu } from 'react-icons/fi';

import { useState } from 'react';
import { useAuthContext } from '@contexts/AuthContexts';

import { User } from 'firebase/auth';

import NavigationLink from '@components/NavigationLink';
import UserProfileOverview from '@components/utils/UserProfileOverview';
import { ColorModeButton } from '@components/ui/color-mode';

function Logo() {
    return (
        <Container h={70} textAlign={"center"} alignContent={"center"}>
            LOGO
        </Container>
    )
}

function Navigation({ user } : { user: User | null }) {
    return (
        <VStack w="100%" h="100%" m={0} p={0} align="stretch">
            <NavigationLink target="/">
                <FaMagnifyingGlass /> Discover
            </NavigationLink>

            {
                user ?
                        <>
                            <NavigationLink target="/userAppointments">
                                <FaRegCalendar /> Visits
                            </NavigationLink>
                            <NavigationLink target="/userProfile">
                                <FaRegUser />Profile
                            </NavigationLink>
                        </>
                    : 
                        <>
                        </>
            }
            
            <Spacer />

            <NavigationLink target="/users">
                <FaUsers /> Users
            </NavigationLink>

            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
        </VStack>
    )
}

function SidebarContent({ user, ...props }: { user: User | null } & StackProps) {
    return (
        <VStack w="250px" h="100%" m={0} p={0} align="stretch" {...props}>
            <Logo />
            <Navigation user={user} />

            <Spacer />

            <HStack w="100%" m={0} p={0} display={"none"}>
                <ColorModeButton />
                <Text>Color Mode</Text> 
            </HStack>

            <Spacer h={8} />
            
            <UserProfileOverview />
        </VStack>
    )
}

export default function Sidebar() {
    const user = useAuthContext()
    const [open, setOpen] = useState(false);

    return (
        <>
            <Box display={{ base: "block", md: "none" }}>
                <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement={"start"}>
                    <Drawer.Trigger position="absolute" left="-5px" top="5px" zIndex={100} bgColor={"white"} m={0} p={0} asChild>
                        <Button variant="outline" size="md" m="0">
                            <FiMenu />
                        </Button>
                    </Drawer.Trigger>
                    <Portal>
                        <Drawer.Backdrop />
                        <Drawer.Positioner>
                        <Drawer.Content w="300px" h="vh" m={0} p={0}>
                            <Drawer.Body p={6}>
                                <SidebarContent user={user} />
                            </Drawer.Body>
                            <Drawer.CloseTrigger asChild>
                                <CloseButton size="md" />
                            </Drawer.CloseTrigger>
                        </Drawer.Content>
                        </Drawer.Positioner>
                    </Portal>
                </Drawer.Root>
            </Box>

            <Box display={{ base: "none", md: "block"}}>
                <SidebarContent user={user} p={4} borderRight="solid 1px"/>
            </Box>
        </>
    )
}