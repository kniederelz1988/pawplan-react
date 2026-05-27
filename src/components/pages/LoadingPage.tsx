import { Flex, Spacer, Spinner } from "@chakra-ui/react";

export default function LoadingPage() {
    return (
        <Flex w="vw" direction="row">
            <Spacer />

            <Flex h="vh" direction="column">
                <Spacer />

                <Spinner size={"xl"}/>

                <Spacer />
            </Flex>

            <Spacer />
        </Flex>
    )
}