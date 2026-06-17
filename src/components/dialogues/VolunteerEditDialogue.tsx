import { useCallback } from "react";
import { CloseButton, Dialog, DialogOpenChangeDetails, HStack, Portal, Spacer } from "@chakra-ui/react";

import { VolunteerModel } from "@models/VolunteerModel";

import VolunteerForm from "@components/forms/VolunteerForm";
import ProfileBadge from "@components/misc/profiles/ProfileBadge";
import { useVolunteerRepository, useVolunteerRole } from "@repos/hooks/VolunteerHooks";

export type VolunteerEditDialogueData = {
    volunteer: VolunteerModel
}
export function createVolunteerEditDialogueData(volunteer: VolunteerModel) : VolunteerEditDialogueData {
    return { volunteer: volunteer }
}

type VolunteerEditDialogueProps = { 
    open: boolean, 
    onClose: () => void,
    data: VolunteerEditDialogueData
}

export default function VolunteerEditDialogue({ open, onClose, data } : VolunteerEditDialogueProps) {
    const volunteerRepository = useVolunteerRepository()
    const { role } = useVolunteerRole(data?.volunteer)
    
    const handleSubmit = useCallback((volunteer: VolunteerModel) => {
        volunteerRepository.updateVolunteer(volunteer)
        onClose()
    }, [data, onClose]);

    const handleOpenChange = useCallback((e: DialogOpenChangeDetails) => {
        if(!e.open) {
            onClose()
        }
    }, [onClose])

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

                                    { <ProfileBadge role={role} /> }
                                </HStack>
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            { 
                                data?.volunteer &&
                                    <VolunteerForm volunteer={data.volunteer} onSubmit={handleSubmit} onReset={onClose} />
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