import { IconButton } from "@chakra-ui/react"
import { useDialogueContext } from "@contexts/hooks/useDialogueContext"
import { useLocalVolunteerRole } from "@repos/hooks/VolunteerHooks"
import { DogModel } from "@models/DogModel"
import { useCallback } from "react"
import { PiPencil } from "react-icons/pi"

type DogEditButtonProps = {
    dog: DogModel
}

export default function DogEditButton({ dog } : DogEditButtonProps) {
    const { volunteer, role } = useLocalVolunteerRole()

    const dialogueContext = useDialogueContext()

    const onEditDogClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();

        if (volunteer == null) {
            dialogueContext.openDialogue({ type: "userLogin" })
            return
        }

        dialogueContext.openDialogue({ type: "dogEdit", data: { dog: dog } })
    }, [dog, volunteer, dialogueContext])

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