import { CloseButton, Dialog, DialogOpenChangeDetails, Portal } from "@chakra-ui/react";

import { useCallback } from "react";
import UserRegisterForm from "@components/forms/UserRegisterForm";

type UserRegisterDialogueProps = { 
    open: boolean, 
    onClose: () => void
}

export default function UserRegisterDialogue({ open, onClose } : UserRegisterDialogueProps) {
    const handleOpenChange = useCallback((e: DialogOpenChangeDetails) => {
        if(!e.open) {
            onClose()
        }
    }, [onClose])

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