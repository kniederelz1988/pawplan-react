import React, { useCallback } from "react"
import { CloseButton, DateValue, Dialog, DialogOpenChangeDetails, Portal, Text } from "@chakra-ui/react"

import AppointmentBookingDialogueForm from "@components/forms/AppointmentBookingDialogueForm"
import { DogModel } from "@models/DogModel"
import { toaster } from "@components/ui/toaster"

export type AppointmentBookingDialogueData = {
    dog: DogModel
}

type AppointmentBookingDialogueProps = { 
    open: boolean, 
    onClose: () => void,
    data: AppointmentBookingDialogueData
}

export default function AppointmentBookingDialogue({ open, onClose, data } : AppointmentBookingDialogueProps) {
    const handleConfirm = useCallback((dog: DogModel, date: DateValue) => {
        toaster.create({
            title: "Visit booked",
            description: (
                <>
                    <Text>
                        Dog: {dog.name}
                    </Text>
                    <Text>
                        Date: {date.toString()}
                    </Text>
                </>
            )
        })
        onClose()
    }, []);

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
                                Visit with {data?.dog?.name}
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <AppointmentBookingDialogueForm dog={data?.dog} onConfirm={handleConfirm} onClose={onClose}/>
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