import { useCallback } from "react"

import { Button, Center, Flex, Text } from "@chakra-ui/react"

import { VolunteerModel } from "@models/VolunteerModel"
import { VolunteerRole } from "@models/enums/UserRoleType"
import { useLocalVolunteerRole, useVolunteerCollection, useVolunteerRepository } from "@repos/hooks/VolunteerHooks"

import { useDialogueContext } from "@contexts/hooks/useDialogueContext"

import VolunteersAdminCard from "@components/misc/volunteers/VolunteerAdminCard"
import { PageHeading } from "@components/misc/PageHeading"
import { createVolunteerEditDialogueData } from "@components/dialogues/functions/createVolunteerEditDialogueData"

export default function AdminUserPage() {
    const dialogueContext = useDialogueContext()

    const { volunteer, role } = useLocalVolunteerRole()

    const { updateVolunteerRole } = useVolunteerRepository()

    const { volunteers, page, previousPage, previousPageActive, nextPage, nextPageActive } = useVolunteerCollection(5)

    const onEditVolunteer = useCallback((v: VolunteerModel) => {
        if (!volunteer?.id && role != "admin")
            return

        const data = createVolunteerEditDialogueData(v)
        dialogueContext.openDialogue({ type: "userEdit", data: data})
    }, [volunteer, role, dialogueContext])
    const onEditRole = useCallback((v: VolunteerModel, r: VolunteerRole) => {
        if (volunteer?.id == v?.id && role != "admin")
            return

        updateVolunteerRole(v, r)
    }, [volunteer, role, updateVolunteerRole])

    return (
        <Flex flexDirection="column" m="auto" maxW={850}>
            <PageHeading>All users</PageHeading>
            
            <Text justifyContent="left" w="100%" fontSize={"md"} fontWeight="light">You can edit all users here. For admins only.</Text>
            
            <Flex direction={"column"} gap={4} mt={4}>
                { 
                    volunteers.map(v => 
                        <VolunteersAdminCard key={v.id} volunteer={v} onEditVolunteer={onEditVolunteer} onEditRole={onEditRole} disableEditRole={volunteer?.id == v?.id} />) 
                }
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