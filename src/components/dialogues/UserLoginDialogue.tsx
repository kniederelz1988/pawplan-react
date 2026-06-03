import { CloseButton, Dialog, DialogOpenChangeDetails, Portal } from "@chakra-ui/react"
import UserLoginForm from "@components/forms/UserLoginForm"
import { useAuthContext } from "@contexts/AuthContexts"
import { useEffect } from "react"

type UserLoginDialogueProps = { 
    open: boolean, 
    onClose: () => void
}

export default function UserLoginDialogue({ open, onClose } : UserLoginDialogueProps) {
    const user = useAuthContext()

    useEffect(() => {
        if(!user) {
            return
        }

        onClose()
    }, [user])

    function handleOpenChange(e: DialogOpenChangeDetails) {
        if(!e.open) {
            onClose()
        }
    }

    return (
        <Dialog.Root motionPreset="slide-in-bottom" open={open} onOpenChange={handleOpenChange}>
            <Portal>
                <Dialog.Backdrop onClick={onClose}/>
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header p="14px">
                            <Dialog.Title>
                                Login
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <UserLoginForm />
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