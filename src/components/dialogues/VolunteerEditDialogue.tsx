import { useCallback } from "react";
import { Badge, CloseButton, Dialog, DialogOpenChangeDetails, HStack, Portal, Spacer, Text } from "@chakra-ui/react";

import { toaster } from "@components/ui/toaster";

import { VolunteerModel } from "@models/VolunteerModel";
import volunteerRepository from "@repos/VolunteerRepository";

import VolunteerForm from "@components/forms/VolunteerForm";
import useLocalVolunteer from "@hooks/useLocalVolunteer";


export type VolunteerEditDialogueData = {
    volunteer: VolunteerModel,
    enableAdminControls?: boolean
}
type VolunteerEditDialogueProps = { 
    open: boolean, 
    onClose: () => void,
    data: VolunteerEditDialogueData
}

export default function VolunteerEditDialogue({ open, onClose, data } : VolunteerEditDialogueProps) {
    const handleSubmit = useCallback((volunteer: VolunteerModel) => {

        volunteerRepository.updateVolunteer(volunteer, (_, error) => {
            if (error) {
                toaster.create({
                    title: "Update failed",
                    description: ( <Text>{error}</Text> )
                })
                onClose()
                return
            }

            toaster.create({ title: "Update success" })
            onClose()
        })

    }, [data]);

    const handleOpenChange = useCallback((e: DialogOpenChangeDetails) => {
        if(!e.open) {
            onClose()
        }
    }, [])

    return (
        <Dialog.Root motionPreset="slide-in-bottom" open={open} onOpenChange={handleOpenChange}>
            <Portal>
                <Dialog.Backdrop onClick={onClose}/>
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header p="14px">
                            <Dialog.Title>
                                <HStack>
                                    Edit volunteer

                                    <Spacer />

                                    { 
                                        data && data.volunteer.admin
                                            ? <Badge colorPalette={"red"}>Admin</Badge>
                                            : <Badge>Volunteer</Badge>
                                    }
                                </HStack>
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                        {
                            data && <VolunteerForm volunteer={data.volunteer} onSubmit={handleSubmit} onReset={onClose} />
                        }
                        </Dialog.Body>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}