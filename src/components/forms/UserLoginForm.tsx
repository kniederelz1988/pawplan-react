import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";

import { Alert, Center, Field, HStack, IconButton, Input, Link, Spacer, Text } from "@chakra-ui/react";
import { FiLogIn } from "react-icons/fi";

import useAuthentification from "@hooks/useAuthentification";
import { useDialogueContext } from "@contexts/DialogueContext";

import { DialogueTypeEnum } from "@components/dialogues/enums/DialogueType";
import { userLoginSchema } from "@schemas/userSchemas";

type UserLoginFormProps = {
    showRegisterLink: boolean
}

export default function UserLoginForm({ showRegisterLink } : UserLoginFormProps) {
    const dialogueContext = useDialogueContext()
    const { error, signInUser } = useAuthentification()

    const { handleSubmit, register, formState: { errors } } = useForm({
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: yupResolver(userLoginSchema)
    })

    function handleLogin(data: any) {
        signInUser(data.email , data.password)
    }
    function handleRegister(e: any) {
        e.preventDefault()
        dialogueContext.openDialogue(DialogueTypeEnum.UserRegister)
    }

    return (
        <form onSubmit={handleSubmit(handleLogin)}> 
            <Field.Root invalid={!!errors.email}>
                <Field.Label>E-Mail</Field.Label>
                <Input type="email" {...register("email")} placeholder="jane@example.com"/>
                <Field.ErrorText>
                    <Field.ErrorIcon />
                    {errors.email?.message}
                </Field.ErrorText>
            </Field.Root>

            <Spacer h={2} />

            <Field.Root invalid={!!errors.password}>
                <Field.Label>Password</Field.Label>
                <Input type="password" {...register("password")} placeholder="*******" />
                <Field.ErrorText>
                    <Field.ErrorIcon />
                    {errors.password?.message}
                </Field.ErrorText>
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

            <HStack mx={0} mt={2}>
                <IconButton type="submit" w="100%">
                    <FiLogIn />Sign in
                </IconButton>
            </HStack>

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