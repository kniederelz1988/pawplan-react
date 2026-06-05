import { Flex, Heading } from "@chakra-ui/react"

export default function Users() {
    return (
        <Flex flexDirection="column" m="auto" maxW={850}>
            <Heading justifyContent="left" w="100%" mb={-1}>All users</Heading>
            <Heading justifyContent="left" w="100%" fontSize="md" fontWeight="light">You can edit all users here. For admins only.</Heading>
            
        </Flex>
    )
}