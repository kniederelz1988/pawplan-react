import { useCallback } from "react";

import { CloseButton, Dialog, DialogOpenChangeDetails, Grid, GridItem, Heading, Portal } from "@chakra-ui/react";
import DogForm from "@components/forms/DogForm";

import { DogModel } from "@models/DogModel";
import DogCard from "@components/misc/dogs/DogCard";

import { useDogRepository } from "@repos/hooks/DogHooks";
import DialogueBox from "@components/hocs/withDialogueBox";

export type DogEditDialogueData = {
    dog: DogModel
}
type DogEditDialogueProps = { 
    open: boolean, 
    onClose: () => void,
    data: DogEditDialogueData
}

export default function DogEditDialogue({ open, onClose, data } : DogEditDialogueProps) {
    const { updateDog }= useDogRepository()

    const handleConfirm = useCallback(() => {
        if (!data?.dog)
            return

        updateDog(data.dog)
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
        <DialogueBox open={open} title="Edit dog" size="xl" onClose={onClose}>
            <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(5, 1fr)" }} gap={6}>
                <GridItem colSpan={{ base: 2, md: 2 }} alignContent={"start"}>
                    { data?.dog && <DogCard dog={data.dog} /> }
                </GridItem>

                <GridItem colSpan={{ base: 2, md: 3 }} alignContent={"center"}>
                    { data?.dog && <DogForm dog={data.dog} onSubmit={handleConfirm} onReset={handleCancel}/> }
                </GridItem>
            </Grid>
        </DialogueBox>
    )
}