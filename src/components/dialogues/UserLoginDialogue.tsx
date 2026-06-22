import { useCallback, useEffect } from "react"
import { CloseButton, Dialog, DialogOpenChangeDetails, Heading, Portal } from "@chakra-ui/react"

import UserLoginForm from "@components/forms/UserLoginForm"
import { useAuthContext } from "@contexts/AuthContexts"

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
    }, [user, onClose])

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
                        <Dialog.Header p={4}>
                            <Dialog.Title>
                                <Heading px={4}>Login</Heading>
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body px={4} pt={2} pb={4}>
                            <UserLoginForm showRegisterLink={true} />
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