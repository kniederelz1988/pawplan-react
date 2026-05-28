import { VStack, Heading, ListItem, ListRoot } from "@chakra-ui/react";
import useDogsCollection from "@hooks/useDogsCollection";

export default function DogsOverview() {
    const { dogs, filterDogsByIds } = useDogsCollection([])

    return (
        <VStack>
            <Heading>Dogs Overview</Heading>

            <ListRoot>
            {
                dogs.map(t => <ListItem key={t.id}>{t.name}</ListItem>)
            }
            </ListRoot>
        </ VStack>
    )
}