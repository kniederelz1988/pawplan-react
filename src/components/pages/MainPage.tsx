import { Flex, HStack } from "@chakra-ui/react";
import Navigation from "../Navigation";
import Router from "../Router";

export default function MainPage() {
    return (
        <HStack>
            <Navigation />

            <Flex w="vw" h="vh" p={2}>
                <Router />
            </Flex>
        </HStack>
    )
}