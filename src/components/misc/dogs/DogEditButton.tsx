import { IconButton } from "@chakra-ui/react"
import { useDialogueContext } from "@contexts/DialogueContext"
import { useVolunteer, useVolunteerRole } from "@repos/hooks/VolunteerHooks"
import { DogModel } from "@models/DogModel"
import { DialogueTypeEnum } from "@components/dialogues/enums/DialogueType"
import { useCallback } from "react"
import { PiPencil } from "react-icons/pi"

type DogEditButtonProps = {
    dog: DogModel
}

export default function DogEditButton({ dog } : DogEditButtonProps) {
    const { volunteer } = useVolunteer()
    const role = useVolunteerRole()

    const dialogueContext = useDialogueContext()

    const onEditDogClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();

        if (volunteer == null) {
            dialogueContext.openDialogue(DialogueTypeEnum.UserLogin)
            return
        }

        dialogueContext.openDialogue(DialogueTypeEnum.DogEdit, { dog: dog })
    }, [volunteer, role, dog])

    return (
        <>
        { 
            volunteer && role == "admin" &&
                <IconButton 
                    aria-label={`Edit ${dog.name}`}
                    borderRadius={24} 
                    bgColor={"accent.200"} 
                    _hover={{ bgColor: "accent.100" }} 
                    onClick={onEditDogClick} >
                    <PiPencil  aria-hidden="true" color={"black"} />
                </IconButton>
        }
        </>
    )
}