import { Heading, Grid, Flex, Text } from "@chakra-ui/react";

import DogOverviewCard from "@components/DogOverviewCard";
import useDogsCollection from "@hooks/DogHooks";

export default function DogsOverview() {
    const { dogs } = useDogsCollection([])

    return (
        <Flex flexDirection="column" m="auto" maxW={850}>
            <Heading justifyContent="left" w="100%" mb={-1}>Dogs Overview</Heading>
            <Heading justifyContent="left" w="100%" fontSize="md" fontWeight="light">Find a shelter companion to spend time with today.</Heading>
            
            {/*<DogFilter onFilterChanged={() => {}} />*/}
            
            <Text fontVariant="all-petite-caps">{dogs.length} dogs available</Text>
            
            <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)"}} gap={4}>
                { dogs.map(t => <DogOverviewCard key={t.id} dog={t} />) }
            </Grid>
        </Flex>
    )
}