import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";

import { Alert, Center, Field, HStack, IconButton, Input, Link, Spacer, Text } from "@chakra-ui/react";
import { FaUserPlus } from "react-icons/fa";

import { useDialogueContext } from "@contexts/DialogueContext";
import { DialogueTypeEnum } from "@components/dialogues/enums/DialogueType";

import useCreateUser from "@hooks/useCreateUser";
import { userRegisterSchema } from "@schemas/userSchemas";

type UserRegisterFormProps = {
    showLoginHint: boolean
}

export default function UserRegisterForm({ showLoginHint } : UserRegisterFormProps) {
    const dialogueContext = useDialogueContext()

    const { error, createUser } = useCreateUser()

    const { handleSubmit, register, formState: { errors } } = useForm({
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: yupResolver(userRegisterSchema)
    })

    function handleLogin(e: React.MouseEvent) {
        e.preventDefault()
        dialogueContext.openDialogue(DialogueTypeEnum.UserLogin)
    }
    function handleRegister(data: any) {
        createUser(data.email, data.password, data.name)
    }
    
    return (
        <form onSubmit={handleSubmit(handleRegister)}>
            <Field.Root invalid={!!errors.name}>
                <Field.Label>Name</Field.Label>
                <Input type="text" {...register("name")} placeholder="John Doe/Jane Roe"/>
                <Field.ErrorText>
                    <Field.ErrorIcon />
                    {errors.name?.message}
                </Field.ErrorText>
            </Field.Root>
            
            <Spacer h={2} />
            
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
                    <FaUserPlus /> Create account
                </IconButton>
            </HStack>

            {
                showLoginHint &&
                    <>
                        <Spacer h={2} />
                        
                        <Center>
                            <HStack>
                                <Text>Already volunteering?</Text>
                                <Link onClick={handleLogin}>Use existing account</Link>
                            </HStack>
                        </Center>
                    </>
            }
        </form>
    )
}