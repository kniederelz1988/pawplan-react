import { Flex, Heading } from "@chakra-ui/react";

export default function UserAppointments() {
    return (
        <Flex flexDirection="column" m="auto" maxW={850}>
            <Heading justifyContent="left" w="100%" mb={-1}>Your visits</Heading>
            <Heading justifyContent="left" w="100%" fontSize="md" fontWeight="light">
                All your scheduled and past shelter visits.
            </Heading>
            
        </Flex>
    )
}