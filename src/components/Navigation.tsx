import { Spacer, VStack } from "@chakra-ui/react"
import { FaMagnifyingGlass, FaRegCalendar, FaRegUser, FaUsers } from "react-icons/fa6"

import { useAuthContext } from "@contexts/AuthContexts"
import NavigationLink from "@components/NavigationLink"

export default function Navigation() {
    const user = useAuthContext()

    return (
        <VStack w="100%" h="100%" m={0} p={0} align="stretch">
            <NavigationLink target="/">
                <FaMagnifyingGlass /> Discover
            </NavigationLink>
            <NavigationLink target="/userAppointments" disabled={!user}>
                <FaRegCalendar /> Visits
            </NavigationLink>
            <NavigationLink target="/userProfile" disabled={!user}>
                <FaRegUser />Profile
            </NavigationLink>

            <Spacer />

            <NavigationLink target="/users" disabled={!user}>
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
