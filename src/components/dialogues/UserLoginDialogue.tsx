import DialogueBox from "@components/hocs/withDialogueBox"

import UserLoginForm from "@components/forms/UserLoginForm"
import { DialogueProps } from "@contexts/providers/DialogueProvider"
import { useDialogueContext } from "@contexts/hooks/useDialogueContext"
import { useCallback } from "react"

export default function UserLoginDialogue({ open } : DialogueProps<null>) {
    const dialogueContext = useDialogueContext()

    const handleClose = useCallback(() => {
        dialogueContext.closeDialogue()
    }, [dialogueContext])

    return (
        <DialogueBox open={open} title="Login" onClose={handleClose}>
            <UserLoginForm showRegisterLink={true} />
        </DialogueBox>
    )
}