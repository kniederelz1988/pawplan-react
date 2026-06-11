import { Alert, Center, Field, HStack, IconButton, Input, Link, Spacer, Text } from "@chakra-ui/react";
import { FaUserPlus } from "react-icons/fa";

import { useDialogueContext } from "@contexts/DialogueContext";
import { DialogueTypeEnum } from "@models/enums/DialogueType";

import useCreateUser from "@hooks/useCreateUser";

type UserRegisterFormProps = {
    showLoginHint: boolean
}

export default function UserRegisterForm({ showLoginHint } : UserRegisterFormProps) {
    const dialogueContext = useDialogueContext()

    const { isLoading, error, createUser } = useCreateUser()

    function handleLogin(e: React.MouseEvent) {
        e.preventDefault()
        dialogueContext.openDialogue(DialogueTypeEnum.UserLogin)
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

            {
                error 
                    ?  
                        <>
                            <Spacer h={4} />

                            <Alert.Root status="error" title={error} p={2}>
                                <Alert.Indicator />
                                <Alert.Title>{error}</Alert.Title>
                            </Alert.Root>
                        </>
                    : <></>
            }

            <Spacer h={4} />

            <IconButton type="submit" w="100%">
                <FaUserPlus /> Create account
            </IconButton>

            {
                showLoginHint 
                    ?
                        <>
                            <Spacer h={2} />
                            
                            <Center>
                                <HStack>
                                    <Text>Already volunteering?</Text>
                                    <Link onClick={handleLogin}>Use existing account</Link>
                                </HStack>
                            </Center>
                        </>
                    : <></>
            }
        </form>
    )
}