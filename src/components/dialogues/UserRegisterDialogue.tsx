import DialogueBox from "@components/hocs/withDialogueBox";
import UserRegisterForm from "@components/forms/UserRegisterForm";

type UserRegisterDialogueProps = { 
    open: boolean, 
    onClose: () => void
}

export default function UserRegisterDialogue({ open, onClose } : UserRegisterDialogueProps) {
    return (
        <DialogueBox open={open} title="Register new account" onClose={onClose}>
            <UserRegisterForm showLoginHint={true} />
        </DialogueBox>
    )
}