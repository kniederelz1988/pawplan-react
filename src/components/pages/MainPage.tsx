import { Box, Container, Flex, Link } from "@chakra-ui/react";
import Sidebar from "@components/navigation/Sidebar";
import Router from "@components/Router";

export default function MainPage() {
    return (
        <Flex h="vh" overflowY="hidden">
            <Link
                href="#main-content"
                position="absolute"
                left="-9999px"
                _focus={{
                    left: "1rem",
                    top: "1rem",
                    zIndex: 1000,
                }}
            >
                Skip to main content
            </Link>

            <Sidebar />

            <Box 
                as="main"
                id="main-content" 
                flex="1"
                overflowY="auto"
                pt={6} 
                pb={24}
                pl={{ base: 6, md: 0 }}
                pr={{ base: 0, md: 0 }}
            >
                <Container>
                    <Router />
                </Container>
            </Box>
        </Flex>
    )
}