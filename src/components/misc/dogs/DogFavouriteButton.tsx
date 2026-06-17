import { IconButton } from "@chakra-ui/react";
import { useDialogueContext } from "@contexts/DialogueContext";
import { useVolunteer } from "@repos/hooks/VolunteerHooks";
import { DogModel } from "@models/DogModel";
import { DialogueTypeEnum } from "@components/dialogues/enums/DialogueType";

import { useCallback } from "react";
import { HiHeart } from "react-icons/hi";

type DogFavouriteButtonProps = {
    dog: DogModel
}

export default function DogFavouriteButton({ dog } : DogFavouriteButtonProps) {
    const { volunteer, isFavourite, toggleFavourite } = useVolunteer()

    const dialogueContext = useDialogueContext()
    
    const onFavouriteDogClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();

        if (volunteer == null) {
            dialogueContext.openDialogue(DialogueTypeEnum.UserLogin)
            return
        }

        toggleFavourite(dog)
    }, [volunteer, toggleFavourite, dog])

    return (
        <>
        { 
            volunteer &&
                <IconButton borderRadius={24} bgColor={"accent.200"} _hover={{ bgColor: "accent.100" }} onClick={onFavouriteDogClick}>
                    <HiHeart color={isFavourite(dog) ? "red": "black" } />
                </IconButton>
        }
        </>
    )
}