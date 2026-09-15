import { useCallback } from "react";

import { Grid, GridItem } from "@chakra-ui/react";
import { useDogRepository } from "@repos/hooks/DogHooks";

import { DogModel } from "@models/DogModel";
import DogCard from "@components/misc/dogs/DogCard";
import DogForm from "@components/forms/DogForm";

import DialogueBox from "@components/hocs/withDialogueBox";
import { DialogueProps } from "@contexts/providers/DialogueProvider";
import { useDialogueContext } from "@contexts/hooks/useDialogueContext";

export type DogEditDialogueData = {
    dog: DogModel
}

export default function DogEditDialogue({ open, data } : DialogueProps<DogEditDialogueData>) {
    const { updateDog } = useDogRepository()

    const dialogueContext = useDialogueContext()
            
    const handleClose = useCallback(() => {
        dialogueContext.closeDialogue()
    }, [dialogueContext])

    const handleConfirm = useCallback(() => {
        if (!data?.dog)
            return

        updateDog(data.dog)
        handleClose()
    }, [updateDog, handleClose, data]);
    const handleCancel = useCallback(() => {
        handleClose()
    }, [handleClose])

    return (
        <DialogueBox open={open} title="Edit dog" size="xl" onClose={handleClose}>
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