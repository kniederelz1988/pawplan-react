import { Flex, Heading, Spacer, VStack } from "@chakra-ui/react";

import UserRegisterForm from "@components/forms/UserRegisterForm";

export default function UserRegisterPage() {
    return (
        <Flex h="vh" direction="column">
            <Spacer />

            <VStack>
                <Heading>Register</Heading>

                <UserRegisterForm />
            </VStack>

            <Spacer />
        </Flex>
    )
}