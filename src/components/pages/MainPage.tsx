import { Box, Container, Flex } from "@chakra-ui/react";
import Sidebar from "@components/navigation/Sidebar";
import Router from "@components/Router";

export default function MainPage() {
    return (
        <Flex h="vh" overflowY="hidden">
            <Sidebar />

            <Box flex="1" overflowY="auto"
                px={{ base: 0, md: 6 }} 
                py={6} 
                pl={{ base: 6, md: 0 }}
                pr={{ base: 0, md: 0}}
            >
                <Container w="100%" scrollBehavior={"auto"}>
                    <Router />
                </Container>
            </Box>
        </Flex>
    )
}