import { IconButton } from "@chakra-ui/react"
import { useDialogueContext } from "@contexts/DialogueContext"
import { useVolunteer, useVolunteerRole } from "@hooks/VolunteerHooks"
import { DogModel } from "@models/DogModel"
import { DialogueTypeEnum } from "@models/enums/DialogueType"
import { VolunteerRoleEnum } from "@models/enums/UserRoleType"
import { useCallback } from "react"
import { PiPencil } from "react-icons/pi"

type DogEditButtonProps = {
    dog: DogModel
}

export default function DogEditButton({ dog } : DogEditButtonProps) {
    const { volunteer } = useVolunteer()
    const { role } = useVolunteerRole(volunteer)

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
            volunteer && role == VolunteerRoleEnum.Admin &&
                <IconButton variant="subtle" borderRadius={24} bgColor={"bg.emphasized"} onClick={onEditDogClick}>
                    <PiPencil />
                </IconButton>
        }
        </>
    )
}