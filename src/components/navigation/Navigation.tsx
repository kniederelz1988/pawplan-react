import { useCallback } from "react"

import { Spacer, Text, VStack } from "@chakra-ui/react"
import { FaMagnifyingGlass, FaPaw, FaRegCalendar, FaRegUser, FaUsers } from "react-icons/fa6"

import NavigationLink from "@components/navigation/NavigationLink"
import withRouterLink from "@components/hocs/withRouterLink"
import withButtonLink from "@components/hocs/withButtonLink"

import { VolunteerRoleEnum } from "@models/enums/UserRoleType"
import { useVolunteer, useVolunteerRole } from "@hooks/VolunteerHooks"

import { DialogueTypeEnum } from "@models/enums/DialogueType"
import { useDialogueContext } from "@contexts/DialogueContext"

import { createDogAddDialogueData } from "@components/dialogues/DogAddDialogue"

const RouterNavigationLink = withRouterLink(NavigationLink)
const ButtonLink = withButtonLink(NavigationLink)

export default function Navigation() {
    const dialogueContext = useDialogueContext()

    const { volunteer } = useVolunteer()
    const { role } = useVolunteerRole(volunteer)

    const handleNewDogClick = useCallback(() => {
        console.log(volunteer, role)
        if (!volunteer || role != VolunteerRoleEnum.Admin)
            return

        const data = createDogAddDialogueData()
        dialogueContext.openDialogue(DialogueTypeEnum.DogAdd, data)
    }, [volunteer, role])

    return (
        <VStack w="100%" h="100%" m={0} p={0} align="stretch">
            <RouterNavigationLink target="/">
                <FaMagnifyingGlass /> Discover
            </RouterNavigationLink>
            <RouterNavigationLink target="/userAppointments" disabled={!volunteer || role == VolunteerRoleEnum.Observer}>
                <FaRegCalendar /> Visits
            </RouterNavigationLink>
            <RouterNavigationLink target="/userProfile" disabled={!volunteer}>
                <FaRegUser />Profile
            </RouterNavigationLink>

            <Spacer />

            <Text fontVariant="all-petite-caps">Admin</Text>
            
            <ButtonLink onClick={handleNewDogClick} disabled={!volunteer || role != VolunteerRoleEnum.Admin}>
                <FaPaw /> New dog
            </ButtonLink>

            <RouterNavigationLink target="/admin/users" disabled={!volunteer || role != VolunteerRoleEnum.Admin}>
                <FaUsers /> Users
            </RouterNavigationLink>

            <RouterNavigationLink target="/admin/appointments" disabled={!volunteer || role != VolunteerRoleEnum.Admin}>
                <FaRegCalendar /> Visits
            </RouterNavigationLink>

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
