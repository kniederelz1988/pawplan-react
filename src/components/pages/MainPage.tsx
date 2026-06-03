import { Box, Container, Flex } from "@chakra-ui/react";
import Navigation from "../Navigation";
import Router from "../Router";

export default function MainPage() {
    return (
        <Flex h="vh" overflowY="hidden">
            <Box w="250px" borderRight="1px solid" borderColor="gray.200" m={0} p={4} flexShrink={0}>
                <Navigation />
            </Box>

            <Box flex="1" overflowY="auto" p={6}>
                <Container w="100%" scrollBehavior={"auto"}>
                    <Router />
                </Container>
            </Box>
        </Flex>
    )
}