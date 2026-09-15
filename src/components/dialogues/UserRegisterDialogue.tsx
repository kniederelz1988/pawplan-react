import DialogueBox from "@components/hocs/withDialogueBox";
import UserRegisterForm from "@components/forms/UserRegisterForm";
import { DialogueProps } from "@contexts/providers/DialogueProvider";
import { useDialogueContext } from "@contexts/hooks/useDialogueContext";
import { useCallback } from "react";

export default function UserRegisterDialogue({ open } : DialogueProps<null>) {
    const dialogueContext = useDialogueContext()
    
    const handleClose = useCallback(() => {
        dialogueContext.closeDialogue()
    }, [dialogueContext])
    
    return (
        <DialogueBox open={open} title="Register new account" onClose={handleClose}>
            <UserRegisterForm showLoginHint={true} />
        </DialogueBox>
    )
}