import { useCallback } from "react";

import { Grid, GridItem } from "@chakra-ui/react";

import { useDogRepository } from "@repos/hooks/DogHooks";
import { DogModel } from "@models/DogModel";

import DogForm from "@components/forms/DogForm";
import DogCard from "@components/misc/dogs/DogCard";

import DialogueBox from "@components/hocs/withDialogueBox";
import { DialogueProps } from "@contexts/providers/DialogueProvider";
import { useDialogueContext } from "@contexts/hooks/useDialogueContext";

export type DogAddDialogueData = {
    dog: DogModel
}

export default function DogAddDialogue({ open, data } : DialogueProps<DogAddDialogueData>) {
    const { createDog } = useDogRepository()

    const dialogueContext = useDialogueContext()
            
    const handleClose = useCallback(() => {
        dialogueContext.closeDialogue()
    }, [dialogueContext])

    const handleConfirm = useCallback(() => {
        if (!data?.dog)
            return

        createDog(data.dog)
        handleClose()
    }, [createDog, handleClose, data]);
    const handleCancel = useCallback(() => {
        handleClose()
    }, [handleClose])

    return (
        <DialogueBox open={open} title="Add dog" size="xl" onClose={handleClose}>
            <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(5, 1fr)" }} gap={6}>
                <GridItem colSpan={{ base: 2, md: 2 }} alignContent={"start"}>
                    { data?.dog && <DogCard dog={data.dog} /> }
                </GridItem>

                <GridItem colSpan={{ base: 2, md: 3 }}  alignContent={"center"}>
                    { data?.dog && <DogForm dog={data.dog} onSubmit={handleConfirm} onReset={handleCancel}/> }
                </GridItem>
            </Grid>
        </DialogueBox>
    )
}