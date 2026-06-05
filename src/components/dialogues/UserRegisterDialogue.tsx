import { CloseButton, Dialog, DialogOpenChangeDetails, Portal } from "@chakra-ui/react";
import UserRegisterForm from "@components/forms/UserRegisterForm";
import { useCallback } from "react";

type UserRegisterDialogueProps = { 
    open: boolean, 
    onClose: () => void
}

export default function UserRegisterDialogue({ open, onClose } : UserRegisterDialogueProps) {
    const handleOpenChange = useCallback((e: DialogOpenChangeDetails) => {
        if(!e.open) {
            onClose()
        }
    }, [])

    return (
        <Dialog.Root motionPreset="slide-in-bottom" open={open} onOpenChange={handleOpenChange}>
            <Portal>
                <Dialog.Backdrop onClick={onClose}/>
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header p="14px">
                            <Dialog.Title>
                                Register new account
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <UserRegisterForm showLoginHint={true} />
                        </Dialog.Body>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}