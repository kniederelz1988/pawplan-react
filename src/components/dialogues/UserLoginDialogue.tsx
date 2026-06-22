import DialogueBox from "@components/hocs/withDialogueBox"

import UserLoginForm from "@components/forms/UserLoginForm"

type UserLoginDialogueProps = { 
    open: boolean, 
    onClose: () => void
}

export default function UserLoginDialogue({ open, onClose } : UserLoginDialogueProps) {
    return (
        <DialogueBox open={open} title="Login" onClose={onClose}>
            <UserLoginForm showRegisterLink={true} />
        </DialogueBox>
    )
}