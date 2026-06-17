import { Heading, Grid, Flex, Text, Spacer } from "@chakra-ui/react";

import DogOverviewCard from "@components/DogOverviewCard";
import useDogsCollection from "@hooks/DogHooks";

export default function DogsOverview() {
    const { dogs } = useDogsCollection([])

    return (
        <Flex flexDirection="column" m="auto" maxW={850}>
            <Heading justifyContent="left" w="100%" fontSize={"2xl"}>Dogs Overview</Heading>
            <Text justifyContent="left" w="100%" fontSize={"md"} fontWeight="light">Find a shelter companion to spend time with today.</Text>
            
            <Text fontVariant="all-petite-caps" mt={2}>{dogs.length} dogs available</Text>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)"}} gap={4}>
                { dogs.map(t => <DogOverviewCard key={t.id} dog={t} />) }
            </Grid>
        </Flex>
    )
}