import { Spacer, VStack } from "@chakra-ui/react"
import { FaMagnifyingGlass, FaRegCalendar, FaRegUser, FaUsers } from "react-icons/fa6"

import { useAuthContext } from "@contexts/AuthContexts"
import NavigationLink from "@components/navigation/NavigationLink"

import { VolunteerRoleEnum } from "@models/enums/UserRoleType"
import { useVolunteer, useVolunteerRole } from "@hooks/VolunteerHooks"

export default function Navigation() {
    const { volunteer } = useVolunteer()
    const { role } = useVolunteerRole(volunteer)

    return (
        <VStack w="100%" h="100%" m={0} p={0} align="stretch">
            <NavigationLink target="/">
                <FaMagnifyingGlass /> Discover
            </NavigationLink>
            <NavigationLink target="/userAppointments" disabled={!volunteer || role == VolunteerRoleEnum.Observer}>
                <FaRegCalendar /> Visits
            </NavigationLink>
            <NavigationLink target="/userProfile" disabled={!volunteer || role == VolunteerRoleEnum.Observer}>
                <FaRegUser />Profile
            </NavigationLink>

            <Spacer />

            <NavigationLink target="/admin/users" disabled={!volunteer || role != VolunteerRoleEnum.Admin}>
                <FaUsers /> Users [Admin]
            </NavigationLink>

            <NavigationLink target="/admin/appointments" disabled={!volunteer || role != VolunteerRoleEnum.Admin}>
                <FaUsers /> Visits [Admin]
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
