import { Center, HStack, Spacer, StackProps, Text, VStack } from "@chakra-ui/react";

import Logo from "@components/navigation/Logo";
import Navigation from "@components/navigation/Navigation";
import { ColorModeButton } from "@components/ui/color-mode";
import UserProfileOverview from "@components/utils/UserProfileOverview";

export default function SidebarContent({ ...props }: StackProps) {
    return (
        <VStack h="100%" m={0} align="stretch" {...props}>
            <Center h={24}>
                <Logo />
            </Center>

            <Spacer />
            
            <Navigation />

            <Spacer />

            <HStack w="100%" m={0} p={0} display={"none"}>
                <ColorModeButton />
                <Text>Color Mode</Text> 
            </HStack>

            <Spacer h={8} />
            
            <UserProfileOverview />
        </VStack>
    )
}
