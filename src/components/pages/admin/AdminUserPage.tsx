import { useCallback } from "react"

import { Button, Center, Flex, Heading, Text } from "@chakra-ui/react"

import { VolunteerModel } from "@models/VolunteerModel"
import { VolunteerRole, VolunteerRoleEnum } from "@models/enums/UserRoleType"
import { useVolunteer, useVolunteerCollection, useVolunteerRepository, useVolunteerRole } from "@repos/hooks/VolunteerHooks"

import { createVolunteerEditDialogueData } from "@components/dialogues/VolunteerEditDialogue"

import { useDialogueContext } from "@contexts/DialogueContext"
import { DialogueTypeEnum } from "@components/dialogues/enums/DialogueType"

import VolunteersAdminCard from "@components/misc/volunteers/VolunteerAdminCard"

export default function AdminUserPage() {
    const dialogueContext = useDialogueContext()

    const { volunteer } = useVolunteer()
    const { role } = useVolunteerRole(volunteer)

    const { updateVolunteerRole } = useVolunteerRepository()

    const { volunteers, page, previousPage, previousPageActive, nextPage, nextPageActive } = useVolunteerCollection(5)

    const onEditVolunteer = useCallback((v: VolunteerModel) => {
        if (!volunteer?.id && role != VolunteerRoleEnum.Admin)
            return

        const data = createVolunteerEditDialogueData(v)
        dialogueContext.openDialogue(DialogueTypeEnum.UserEdit, data)
    }, [volunteer, role])
    const onEditRole = useCallback((v: VolunteerModel, r: VolunteerRole) => {
        if (volunteer?.id == v?.id && role != VolunteerRoleEnum.Admin)
            return

        updateVolunteerRole(v, r)
    }, [volunteer, role])

    return (
        <Flex flexDirection="column" m="auto" maxW={850}>
            <Heading justifyContent="left" w="100%" fontSize={"2xl"}>All users</Heading>
            <Text justifyContent="left" w="100%" fontSize={"md"} fontWeight="light">You can edit all users here. For admins only.</Text>
            
            <Flex direction={"column"} gap={4} mt={4}>
                { volunteers.map(v => <VolunteersAdminCard key={v.id} volunteer={v} onEditVolunteer={onEditVolunteer} onEditRole={onEditRole} disableEditRole={volunteer?.id == v?.id} />) }
            </Flex>

            <Center gap={4} mt={4}>
                <Button onClick={previousPage} disabled={!previousPageActive}>
                    Prev
                </Button>
                <Text w={16} textAlign={"center"} fontSize={"sm"} fontWeight={"bold"}>{page + 1}</Text>
                <Button onClick={nextPage} disabled={!nextPageActive}>
                    Next
                </Button>
            </Center>
        </Flex>
    )
}