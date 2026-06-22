import { useCallback } from "react";
import { CloseButton, Dialog, DialogOpenChangeDetails, Grid, GridItem, Heading, Portal } from "@chakra-ui/react";

import { useDogRepository } from "@repos/hooks/DogHooks";
import { DogModel } from "@models/DogModel";

import DogForm from "@components/forms/DogForm";
import DogCard from "@components/misc/dogs/DogCard";

import { Timestamp } from "firebase/firestore";
import { DogGenderEnum } from "@models/enums/DogGender";
import { DogSizeEnum } from "@models/enums/DogSize";

export type DogAddDialogueData = {
    dog: DogModel
}
export function createDogAddDialogueData() : DogAddDialogueData {
    return {
        dog: {
            name: "",
            birthday: Timestamp.now(),
            shelterDate: Timestamp.now(),
            adoptionDateValid: false,
            adoptionDate: Timestamp.now(),
            breed: "",
            gender: DogGenderEnum.Female,
            size: DogSizeEnum.Small,
            imageURL: "",
            description: ""
        }
    }
}

type DogAddDialogueProps = { 
    open: boolean, 
    onClose: () => void,
    data: DogAddDialogueData
}

export default function DogAddDialogue({ open, onClose, data } : DogAddDialogueProps) {
    const { createDog } = useDogRepository()

    const handleConfirm = useCallback(() => {
        if (!data?.dog)
            return

        createDog(data.dog)
        onClose()
    }, [data, onClose]);
    const handleCancel = useCallback(() => {
        onClose()
    }, [data, onClose])

    const handleOpenChange = useCallback((e: DialogOpenChangeDetails) => {
        if(!e.open) {
            onClose()
        }
    }, [onClose])

    return (
        <Dialog.Root motionPreset="slide-in-bottom" open={open} onOpenChange={handleOpenChange} size="xl">
            <Portal>
                <Dialog.Backdrop onClick={onClose}/>
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header p={4}>
                            <Dialog.Title>
                                <Heading px={4}>Add dog</Heading>
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body px={4} pt={2} pb={4}>
                            <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(5, 1fr)" }} gap={6}>
                                <GridItem colSpan={{ base: 2, md: 2 }} alignContent={"start"}>
                                    { data?.dog && <DogCard dog={data.dog} /> }
                                </GridItem>

                                <GridItem colSpan={{ base: 2, md: 3 }}  alignContent={"center"}>
                                    { data?.dog && <DogForm dog={data.dog} onSubmit={handleConfirm} onReset={handleCancel}/> }
                                </GridItem>
                            </Grid>
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