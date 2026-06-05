import { Alert, Button, Center, Field, HStack, Input, Link, Spacer, Text } from "@chakra-ui/react";
import useAuthentification from "@hooks/useAuthentification";

import { useDialogueContext } from "@contexts/DialogueContext";
import { DialogueType } from "@models/enums/DialogueType";
import { SubmitEventHandler } from "react";

export default function UserRegisterForm() {
    const dialogueContext = useDialogueContext()
    const { error, createUser } = useAuthentification()

    function handleLogin(e: React.MouseEvent) {
        e.preventDefault()
        dialogueContext.openDialogue(DialogueType.UserLogin)
    }
    function handleRegister(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        createUser(e.target.email.value, e.target.password.value, e.target.displayName.value)
    }
    
    return (
        <form onSubmit={handleRegister}>
            <Field.Root>
                <Field.Label>Name</Field.Label>
                <Input type="text" name="displayName" placeholder="John Doe/Jane Roe"/>
                <Field.ErrorText />
            </Field.Root>
            
            <Spacer h={2} />
            
            <Field.Root>
                <Field.Label>E-Mail</Field.Label>
                <Input type="email" name="email" placeholder="jane@example.com"/>
                <Field.ErrorText />
            </Field.Root>

            <Spacer h={2} />

            <Field.Root>
                <Field.Label>Password</Field.Label>
                <Input type="password" name="password" placeholder="*******" />
                <Field.ErrorText />
            </Field.Root>

            <Spacer h={4} />

            {
                error ?   
                        <Alert.Root status="error" title={error} p={2}>
                            <Alert.Indicator />
                            <Alert.Title>{error}</Alert.Title>
                        </Alert.Root>
                    : <></>
            }

            <Spacer h={4} />

            <Button type="submit" w="100%">Create account</Button>

            <Spacer h={4} />

            <Center>
                <HStack>
                    <Text>Already volunteering?</Text>
                    <Link onClick={handleLogin}>Use existing account</Link>
                </HStack>
            </Center>
        </form>
    )
}