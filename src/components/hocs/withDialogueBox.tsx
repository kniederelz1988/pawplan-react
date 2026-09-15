import { CloseButton, Dialog, DialogOpenChangeDetails, Heading, Portal } from "@chakra-ui/react"

type Props = {
    open:       boolean

    title:      React.ReactNode
    children:   React.ReactNode | React.ReactNode[]
    
    size?:      "xs" | "sm" | "md" | "lg" | "xl" | "cover" | "full"

    onClose:    () => void
}

function withDialogueBox() {
    function render({ open, title, size, children, onClose } : Props) {

        function handleOpenChange(e: DialogOpenChangeDetails) {
            if (e.open)
                return

            onClose()
        }

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

    return render
}

const DialogueBox = withDialogueBox()
export default DialogueBox
