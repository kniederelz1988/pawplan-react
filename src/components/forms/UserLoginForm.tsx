import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";

import { Alert, Button, Center, Field, HStack, Input, Spacer, Text } from "@chakra-ui/react";
import { FiLogIn } from "react-icons/fi";

import useAuthentification from "@hooks/useAuthentification";
import { useDialogueContext } from "@contexts/hooks/useDialogueContext";

import { userLoginSchema } from "@schemas/userSchemas";

type UserLoginFormProps = {
    showRegisterLink: boolean
}
type UserLoginFormData = {
    email: string;
    password: string;
}

export default function UserLoginForm({ showRegisterLink } : UserLoginFormProps) {
    const dialogueContext = useDialogueContext()
    const { error, signInUser } = useAuthentification()

    const { handleSubmit, register, formState: { errors } } = useForm({
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: yupResolver(userLoginSchema)
    })

    function handleLogin(data: UserLoginFormData) {
        signInUser(data.email , data.password)
    }
    function handleRegister(e: React.MouseEvent) {
        e.preventDefault()
        dialogueContext.openDialogue({ type: "userRegister" })
    }

    return (
        <form onSubmit={handleSubmit(handleLogin)}> 
            <Field.Root invalid={!!errors.email}>
                <Field.Label>E-Mail</Field.Label>
                <Input 
                    type="email" 
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                    placeholder="jane@example.com"
                    />
                <Field.ErrorText>
                    <Field.ErrorIcon />
                    {errors.email?.message}
                </Field.ErrorText>
            </Field.Root>

            <Spacer h={2} />

            <Field.Root invalid={!!errors.password}>
                <Field.Label>Password</Field.Label>
                <Input 
                    type="password"
                    autoComplete="current-password"
                    aria-invalid={!!errors.password}
                    {...register("password")}
                    placeholder="*******" 
                    />
                <Field.ErrorText>
                    <Field.ErrorIcon />
                    {errors.password?.message}
                </Field.ErrorText>
            </Field.Root>

            {
                error &&
                    <>
                        <Spacer h={2} />

                        <Alert.Root status="error" role="alert" title={error} p={2}>
                            <Alert.Indicator />
                            <Alert.Title>{error}</Alert.Title>
                        </Alert.Root>
                    </>
            }

            <Spacer h={4} />

            <HStack mx={0} mt={2}>
                <Button type="submit" w="100%">
                    <FiLogIn aria-hidden="true" /> Sign in
                </Button>
            </HStack>

            { 
                showRegisterLink &&
                    <>
                        <Spacer h={2} />
        
                        <Center>
                            <HStack>
                                <Text>New volunteer?</Text>
                                <Button variant="plain" textDecoration="underline" onClick={handleRegister}>
                                    Create an account
                                </Button>
                            </HStack>
                        </Center>
                    </>
            }
        </form>
    )
}