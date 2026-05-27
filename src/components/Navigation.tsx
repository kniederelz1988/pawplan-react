import { Button, Flex, Spacer  } from '@chakra-ui/react';
import { FaMagnifyingGlass, FaRegCalendar, FaRegHeart, FaRegUser } from 'react-icons/fa6';

import useAuthentification from '../hooks/useAuthentification';
import NavigationLink from './NavigationLink';

export default function Navigation() {
    const { signOutUser } = useAuthentification()

    function handleLogout(e: any) {
        e.preventDefault()
        signOutUser()
    }

    return (
        <Flex direction="column" w={200} h="vh" p={2}>
            <NavigationLink target="/">
                <FaMagnifyingGlass /> Discover
            </NavigationLink>
            <NavigationLink target="/userFavorites">
                <FaRegHeart /> Favourites (2)
            </NavigationLink>
            <NavigationLink target="/userAppointments">
                <FaRegCalendar /> Visits
            </NavigationLink>
            <NavigationLink target="/userProfile">
                <FaRegUser />Profile
            </NavigationLink>

            <Spacer />

            <Button onClick={handleLogout}>
                Logout
            </Button>
        </Flex>
    )
}