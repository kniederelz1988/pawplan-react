import { Alert, Center, Field, HStack, IconButton, Input, Link, Spacer, Text } from "@chakra-ui/react";
import { FiLogIn } from "react-icons/fi";

import useAuthentification from "@hooks/useAuthentification";
import { useDialogueContext } from "@contexts/DialogueContext";

import { DialogueTypeEnum } from "@models/enums/DialogueType";
import { useEffect } from "react";

type UserLoginFormProps = {
    showRegisterLink: boolean
}

export default function UserLoginForm({ showRegisterLink } : UserLoginFormProps ) {
    const dialogueContext = useDialogueContext()
    const { user, error, signInUser } = useAuthentification()

    function handleLogin(e: any) {
        e.preventDefault()
        signInUser(e.target.email.value, e.target.password.value)
    }
    function handleRegister(e: any) {
        e.preventDefault()
        dialogueContext.openDialogue(DialogueTypeEnum.UserRegister)
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

            {
                error &&
                    <>
                        <Spacer h={2} />

                        <Alert.Root status="error" title={error} p={2}>
                            <Alert.Indicator />
                            <Alert.Title>{error}</Alert.Title>
                        </Alert.Root>
                    </>
            }

            <Spacer h={4} />

            <IconButton type="submit" w="100%">
                <FiLogIn />Sign in
            </IconButton>

            { 
                showRegisterLink &&
                    <>
                        <Spacer h={2} />
        
                        <Center>
                            <HStack>
                                <Text>New volunteer?</Text>
                                <Link onClick={handleRegister}>Create an account</Link>
                            </HStack>
                        </Center>
                    </>
            }
        </form>
    )
}