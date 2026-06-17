import { IconButton } from "@chakra-ui/react";
import { useDialogueContext } from "@contexts/DialogueContext";
import { useVolunteer, useVolunteerRole } from "@hooks/VolunteerHooks";
import { DogModel } from "@models/DogModel";
import { DialogueTypeEnum } from "@models/enums/DialogueType";
import { VolunteerRoleEnum } from "@models/enums/UserRoleType";
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