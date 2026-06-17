import React, { useCallback } from "react";
import { BiPencil } from "react-icons/bi";

import { Button, Card, Flex, Heading, IconButton, Spacer } from "@chakra-ui/react";

import ProfileBadge from "@components/misc/profiles/ProfileBadge";

import { useVolunteerRole } from "@repos/hooks/VolunteerHooks";
import { VolunteerModel } from "@models/VolunteerModel";
import { VolunteerRole, VolunteerRoleEnum } from "@models/enums/UserRoleType";

type VolunteersAdminCardProps = {
    volunteer: VolunteerModel,
    onEditVolunteer: (volunteer: VolunteerModel) => void,
    onEditRole: (volunteer: VolunteerModel, role: VolunteerRole) => void,
    disableEditRole: boolean
}

export default function VolunteersAdminCard({ volunteer, onEditVolunteer, onEditRole, disableEditRole } : VolunteersAdminCardProps) {
    const { role } = useVolunteerRole(volunteer)

    const onEditUserClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        onEditVolunteer(volunteer)
    }, [volunteer, onEditVolunteer])

    const handleObserverClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        onEditRole(volunteer, VolunteerRoleEnum.Observer)
    }, [volunteer])

    const handleVolunteerClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        onEditRole(volunteer, VolunteerRoleEnum.Volunteer)
    }, [volunteer])
    const handleAdminClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        onEditRole(volunteer, VolunteerRoleEnum.Admin)
    }, [volunteer])

    return (
        <Card.Root key={volunteer.id}>
            <Card.Body gap={0} p={4}>
                <Card.Description as="div">
                    <Flex direction="column" w="100%">
                        <Flex direction="row" w="100%" my={1}>
                            <Heading size="md">{volunteer.name}</Heading>
                            <Spacer />
                            <ProfileBadge role={role} />
                        </Flex>

                        <Flex direction="row" w="100%" my={1}>
                            <IconButton size="sm" variant="subtle" borderRadius={24} onClick={onEditUserClick}>
                                <BiPencil />
                            </IconButton>
                            
                            <Spacer />

                            <Button size={"xs"} ml={2} onClick={handleObserverClick} disabled={disableEditRole || role == VolunteerRoleEnum.Observer}>
                                Make observer
                            </Button>

                            <Button size={"xs"} colorPalette={"green"} ml={2} onClick={handleVolunteerClick} disabled={disableEditRole || role == VolunteerRoleEnum.Volunteer}>
                                Make volunteer
                            </Button>

                            <Button size={"xs"} colorPalette={"red"} ml={2} onClick={handleAdminClick} disabled={disableEditRole || role == VolunteerRoleEnum.Admin}>
                                Make admin
                            </Button>
                        </Flex>
                    </Flex>
                </Card.Description>
            </Card.Body>
        </Card.Root>
    )
}