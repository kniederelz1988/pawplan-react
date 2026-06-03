import { Container, Spacer, VStack } from '@chakra-ui/react';
import { FaMagnifyingGlass, FaRegCalendar, FaRegUser } from 'react-icons/fa6';

import useAuthentification from '../hooks/useAuthentification';
import NavigationLink from './NavigationLink';
import UserProfileOverview from './utils/UserProfileOverview';

export default function Navigation() {
    const { user } = useAuthentification()

    return (
        <VStack w="100%" h="100%" align="stretch">
            <Container h={70} textAlign={"center"} alignContent={"center"}>
                LOGO
            </Container>

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
                    : <></>
            }

            <Spacer />

            <UserProfileOverview />
        </VStack>
    )
}