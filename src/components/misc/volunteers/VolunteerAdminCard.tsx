import React, { useCallback } from "react";
import { BiPencil } from "react-icons/bi";

import { Button, Card, Flex, Heading, IconButton, Spacer } from "@chakra-ui/react";

import ProfileBadge from "@components/misc/profiles/ProfileBadge";

import { useVolunteerRole } from "@repos/hooks/VolunteerHooks";
import { VolunteerModel } from "@models/VolunteerModel";
import { VolunteerRole } from "@models/enums/UserRoleType";

type VolunteersAdminCardProps = {
    volunteer: VolunteerModel,
    onEditVolunteer: (volunteer: VolunteerModel) => void,
    onEditRole: (volunteer: VolunteerModel, role: VolunteerRole) => void,
    disableEditRole: boolean
}

export default function VolunteersAdminCard({ volunteer, onEditVolunteer, onEditRole, disableEditRole } : VolunteersAdminCardProps) {
    const role = useVolunteerRole(volunteer)

    const onEditUserClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        onEditVolunteer(volunteer)
    }, [volunteer, onEditVolunteer])

    const handleObserverClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        onEditRole(volunteer, "observer")
    }, [volunteer])

    const handleVolunteerClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        onEditRole(volunteer, "volunteer")
    }, [volunteer])
    const handleAdminClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        onEditRole(volunteer, "admin")
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
                            <IconButton size="sm" variant="subtle" borderRadius={24} aria-label="Edit profile" onClick={onEditUserClick}>
                                <BiPencil aria-hidden="true" />
                            </IconButton>
                            
                            <Spacer />

                            <Button size={"xs"} ml={2} onClick={handleObserverClick} disabled={disableEditRole || role == "observer"}>
                                Make observer
                            </Button>

                            <Button size={"xs"} colorPalette={"green"} ml={2} onClick={handleVolunteerClick} disabled={disableEditRole || role == "volunteer"}>
                                Make volunteer
                            </Button>

                            <Button size={"xs"} colorPalette={"red"} ml={2} onClick={handleAdminClick} disabled={disableEditRole || role == "admin"}>
                                Make admin
                            </Button>
                        </Flex>
                    </Flex>
                </Card.Description>
            </Card.Body>
        </Card.Root>
    )
}