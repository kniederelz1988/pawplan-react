import { useCallback } from "react"

import { Button, Heading, Spacer, VStack } from "@chakra-ui/react"
import { FaMagnifyingGlass, FaPaw, FaRegCalendar, FaRegUser, FaUsers } from "react-icons/fa6"

import NavigationLink from "@components/navigation/NavigationLink"

import { useVolunteer, useVolunteerRole } from "@repos/hooks/VolunteerHooks"

import { DialogueTypeEnum } from "@components/dialogues/enums/DialogueType"
import { useDialogueContext } from "@contexts/DialogueContext"

import { createDogAddDialogueData } from "@components/dialogues/DogAddDialogue"
import { NavigationItemStyles } from "./NavigationStyling"

export default function Navigation() {
    const dialogueContext = useDialogueContext()

    const { volunteer } = useVolunteer()
    const role = useVolunteerRole()

    const handleNewDogClick = useCallback(() => {
        if (!volunteer || role != "admin")
            return

        const data = createDogAddDialogueData()
        dialogueContext.openDialogue(DialogueTypeEnum.DogAdd, data)
    }, [volunteer, role])

    return (
        <VStack w="100%" h="100%" m={0} p={0} align="stretch">
            <NavigationLink target="/">
                <FaMagnifyingGlass aria-hidden="true"/> Discover
            </NavigationLink>
            <NavigationLink target="/userAppointments" disabled={!volunteer || role == "observer"}>
                <FaRegCalendar aria-hidden="true"/> Visits
            </NavigationLink>
            <NavigationLink target="/userProfile" disabled={!volunteer}>
                <FaRegUser aria-hidden="true"/>Profile
            </NavigationLink>

            <Spacer />

            <Heading fontVariant="all-petite-caps">Admin</Heading>
            
            <Button variant="ghost" {...NavigationItemStyles}
                onClick={handleNewDogClick} disabled={!volunteer || role != "admin"}
                >
                <FaPaw aria-hidden="true"/> New dog
            </Button>

            <NavigationLink target="/admin/users" disabled={!volunteer || role != "admin"}>
                <FaUsers aria-hidden="true"/> Users
            </NavigationLink>

            <NavigationLink target="/admin/appointments" disabled={!volunteer || role != "admin"}>
                <FaRegCalendar aria-hidden="true"/> Visits
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
