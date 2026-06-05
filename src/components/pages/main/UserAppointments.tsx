import { Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import VisitCard from "@components/VisitCard";
import useDogsCollection from "@hooks/useDogsCollection";

export default function UserAppointments() {
    const { dogs } = useDogsCollection([])
    
    return (
        <Flex flexDirection="column" m="auto" maxW={850}>
            <Heading justifyContent="left" w="100%" mb={-1}>Your visits</Heading>
            <Heading justifyContent="left" w="100%" fontSize="md" fontWeight="light">
                All your scheduled and past shelter visits.
            </Heading>
            
            <Text fontVariant="all-petite-caps" mt={4}>Upcoming</Text>
            <VisitCard dog={dogs[0]} appointment={{ }} cancelable />

            <Spacer h={4} />
            <Text fontVariant="all-petite-caps" mt={4}>Pending</Text>
            <VisitCard dog={dogs[0]} appointment={{ }} editable cancelable />

            <Spacer h={4} />
            <Text fontVariant="all-petite-caps" mt={4}>Past visit</Text>
            <VisitCard dog={dogs[0]} appointment={{ }} />
        </Flex>
    )
}