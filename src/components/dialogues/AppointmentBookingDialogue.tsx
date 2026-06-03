import { Button, CloseButton, Dialog, DialogOpenChangeDetails, Portal } from "@chakra-ui/react"
import AppointmentBookingDialogueForm from "@components/forms/AppointmentBookingDialogueForm"
import { DogModel } from "@models/DogModel"
import React from "react"

type AppointmentBookingDialogueProps = { 
    open: boolean, 
    onClose: () => void,
    dog: DogModel
}

export default function AppointmentBookingDialogue({ open, onClose, dog } : AppointmentBookingDialogueProps) {
    function handleOpenChange(e: DialogOpenChangeDetails) {
        if(!e.open) {
            onClose()
        }
    }

    return (
        <Dialog.Root motionPreset="slide-in-bottom" open={open} onOpenChange={handleOpenChange}>
            <Portal>
                <Dialog.Backdrop onClick={onClose}/>
                <Dialog.Positioner>
                    <Dialog.Content
                        bgImage={`
                            linear-gradient(
                                rgba(255,255,255,0.7)
                            ),
                            url('https://images.dog.ceo/breeds/shiba/shiba-15.jpg')
                        `}
                        bgSize="cover"
                        bgPos="center"
                        bgRepeat="no-repeat"
                    >
                        <Dialog.Header p="14px">
                            <Dialog.Title>
                                Visit with {dog?.name}
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <AppointmentBookingDialogueForm dog={dog} onClose={onClose}/>
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