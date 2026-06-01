import { VStack, Heading, ListItem, ListRoot, Button, Input } from "@chakra-ui/react";
import DogForm from "@components/forms/DogForm";
import useDogsCollection from "@hooks/useDogsCollection";

export default function DogsOverview() {
    const { dogs, filterDogsByIds } = useDogsCollection([])

    return (
        <VStack>
            <Heading>Dogs Overview</Heading>

            <ListRoot>
            { 
                dogs.map(t => 
                    <ListItem key={t.id} onClick={() => { if(t.id) filterDogsByIds([t.id]) }}>
                        {t.name}
                    </ListItem>
                )
            }
            </ListRoot>

            <Button onClick={() => filterDogsByIds([])}>Clear filter</Button>
            
            {
                dogs.length == 1 ? <DogForm dog={dogs[0]} /> : <></>
            }
        </ VStack>
    )
}