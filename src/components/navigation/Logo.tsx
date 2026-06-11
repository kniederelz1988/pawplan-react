import { Circle, HStack, Text } from "@chakra-ui/react";
import { FaPaw } from "react-icons/fa6";

export default function Logo() {
    return (
        <HStack m="auto">
            <Circle background="Highlight" color="HighlightText" w={10} h={10}>
                <FaPaw />
            </Circle>
            <Text fontFamily={"serif"} fontSize={"lg"} fontWeight={"bold"}>Pawfect Match</Text>
        </HStack>
    )
}
