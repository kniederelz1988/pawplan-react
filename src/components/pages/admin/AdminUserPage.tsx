import { useCallback } from "react"

import { Button, Center, Flex, Heading } from "@chakra-ui/react"

import { VolunteerModel } from "@models/VolunteerModel"
import { VolunteerRole, VolunteerRoleEnum } from "@models/enums/UserRoleType"
import { useVolunteer, useVolunteerCollection, useVolunteerRepository, useVolunteerRole } from "@hooks/VolunteerHooks"

import { createVolunteerEditDialogueData } from "@components/dialogues/VolunteerEditDialogue"

import { useDialogueContext } from "@contexts/DialogueContext"
import { DialogueTypeEnum } from "@models/enums/DialogueType"

import UserAdminCard from "@components/UserAdminCard"

export default function AdminUserPage() {
    const dialogueContext = useDialogueContext()

    const { volunteer } = useVolunteer()
    const { role } = useVolunteerRole(volunteer)

    const { updateVolunteerRole } = useVolunteerRepository()

    const { volunteers, previousPage, previousPageActive, nextPage, nextPageActive } = useVolunteerCollection()

    const onEditVolunteer = useCallback((v: VolunteerModel) => {
        const data = createVolunteerEditDialogueData(v)
        dialogueContext.openDialogue(DialogueTypeEnum.UserEdit, data)
    }, [])
    const onEditRole = useCallback((v: VolunteerModel, r: VolunteerRole) => {
        if (volunteer?.id == v?.id && role != VolunteerRoleEnum.Admin)
            return

        updateVolunteerRole(v, r)
    }, [volunteer, role])

    return (
        <Flex flexDirection="column" m="auto" maxW={850}>
            <Heading justifyContent="left" w="100%" mb={-1}>All users</Heading>
            <Heading justifyContent="left" w="100%" fontSize="md" fontWeight="light">You can edit all users here. For admins only.</Heading>
            
            <Flex direction={"column"} gap={4} mt={4}>
                { volunteers.map(v => <UserAdminCard key={v.id} volunteer={v} onEditVolunteer={onEditVolunteer} onEditRole={onEditRole} disableEditRole={volunteer?.id == v?.id} />) }
            </Flex>

            <Center gap={4} mt={4}>
                <Button onClick={previousPage} disabled={!previousPageActive}>
                    Prev
                </Button>
                <Button onClick={nextPage} disabled={!nextPageActive}>
                    Next
                </Button>
            </Center>
        </Flex>
    )
}