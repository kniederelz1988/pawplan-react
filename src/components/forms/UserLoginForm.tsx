import { Alert, Button, Center, Field, HStack, Input, Link, Spacer, Text } from "@chakra-ui/react";
import useAuthentification from "@hooks/useAuthentification";
import { useDialogueContext } from "@contexts/DialogueContext";
import { DialogueType } from "@models/enums/DialogueType";

export default function UserLoginForm() {
    const dialogueContext = useDialogueContext()
    const { error, signInUser } = useAuthentification()

    function handleLogin(e: any) {
        e.preventDefault()
        signInUser(e.target.email.value, e.target.password.value)
    }
    function handleRegister(e: any) {
        e.preventDefault()
        dialogueContext.openDialogue(DialogueType.UserRegister)
    }

    return (
        <form onSubmit={handleLogin}> 
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

            <Spacer h={2} />

            {
                error ?   
                    <>
                        <Alert.Root status="error" title={error} p={2}>
                            <Alert.Indicator />
                            <Alert.Title>{error}</Alert.Title>
                        </Alert.Root>

                        <Spacer h={2} />
                    </>
                    : <></>
            }

            <Button type="submit" w="100%">Sign in</Button>

            <Spacer h={2} />
            
            <Center>
                <HStack>
                    <Text>New volunteer?</Text>
                    <Link onClick={handleRegister}>Create an account</Link>
                </HStack>
            </Center>
        </form>
    )
}