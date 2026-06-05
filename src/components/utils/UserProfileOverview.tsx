import { Button, Circle, HStack, Popover, Text, VStack } from "@chakra-ui/react"
import UserLoginForm from "@components/forms/UserLoginForm"
import { useAuthContext } from "@contexts/AuthContexts"

import { getUserInitials } from "@helpers/UserHelpers"

export default function UserProfileOverview() {
    const user = useAuthContext()

    return (
        user ?
            
            <HStack>
                <Circle w="36px" h="36px" bgColor="bg.inverted" color="bg">
                    {getUserInitials(user).toUpperCase()}
                </Circle>

                <VStack gap={0} pl={1} w="100%">
                    <Text fontSize="xs" fontWeight="bold" w="100%">
                        {
                            user.displayName 
                                ? user.displayName 
                                : "NONE"
                        }
                    </Text>
                    <Text fontSize="xs" w="100%">{user.email}</Text>
                </VStack>
            </HStack>
            
        : 

            <Popover.Root positioning={{ placement: "bottom-start" }}>
                <Popover.Trigger asChild>
                    <Button>
                        Login
                    </Button>
                </Popover.Trigger>
                <Popover.Positioner>
                    <Popover.Content borderColor="gray.600" p={4} minW="250px" boxShadow="lg" borderRadius="md">
                        <Popover.Body p={0}>
                            <UserLoginForm />
                        </Popover.Body>
                    </Popover.Content>
                </Popover.Positioner>
            </Popover.Root>
        
    )
}