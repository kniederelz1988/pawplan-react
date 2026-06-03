import { Link } from "react-router-dom";
import { Alert, Button, Field, Flex, Heading, Input, Spacer, Text, VStack } from "@chakra-ui/react";

import useAuthentication from "@hooks/useAuthentification";

export default function UserLoginPage() {
    const { error, signInUser } = useAuthentication()
    
    function handleLogin(e: any) {
        e.preventDefault()
        signInUser(e.target.email.value, e.target.password.value)
    }

    return (
        <Flex h="vh" direction="column">
            <Spacer />

            <VStack>
                <Heading>Login</Heading>

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

                    <Button type="submit" w="100%">Sign in</Button>

                    <Spacer h={4} />

                    <VStack>
                        <Text>New volunteer?</Text>
                        <Link to="/register">Create an account</Link>
                    </VStack>
                </form>
            </VStack>

            <Spacer />
        </Flex>
    )
}