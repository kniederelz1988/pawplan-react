import { IconButton } from "@chakra-ui/react";
import { useDialogueContext } from "@contexts/hooks/useDialogueContext";
import { useVolunteer } from "@repos/hooks/VolunteerHooks";
import { DogModel } from "@models/DogModel";

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
            dialogueContext.openDialogue({ type: "userLogin" })
            return
        }

        toggleFavourite(dog)
    }, [volunteer, dialogueContext, toggleFavourite, dog])

    const favourite = isFavourite(dog)

    return (
        <>
        { 
            volunteer &&
                <IconButton 
                    aria-label={
                        favourite
                            ? `Remove ${dog.name} from favourites`
                            : `Add ${dog.name} to favourites`
                    }
                    aria-pressed={favourite}
                    borderRadius={24} 
                    bgColor={"accent.200"} 
                    _hover={{ bgColor: "accent.100" }}
                    onClick={onFavouriteDogClick}
                >
                    <HiHeart aria-hidden="true" color={isFavourite(dog) ? "red": "black" } />
                </IconButton>
        }
        </>
    )
}