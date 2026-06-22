import { useCallback } from "react"
import { CloseButton, Dialog, DialogOpenChangeDetails, Heading, Portal } from "@chakra-ui/react"

type Props = {
    open:       boolean

    title:      React.ReactNode
    children:   React.ReactNode | React.ReactNode[]
    
    size?:      "xs" | "sm" | "md" | "lg" | "xl" | "cover" | "full"

    onClose:    () => void
}

function withDialogueBox() {
    return ({ open, title, size, children, onClose } : Props) => {
        const handleOpenChange = useCallback((e: DialogOpenChangeDetails) => {
            if (!e.open) {
                onClose()
            }
        }, [onClose])

        return (
            <Dialog.Root motionPreset="slide-in-bottom" open={open} onOpenChange={handleOpenChange} size={size}>
                <Portal>
                    <Dialog.Backdrop onClick={onClose}/>
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header p={4}>
                                <Dialog.Title>
                                    <Heading px={4}>{title}</Heading>
                                </Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body px={4} pt={2} pb={4}>
                                {children}
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
}

const DialogueBox = withDialogueBox()
export default DialogueBox
