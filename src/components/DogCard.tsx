import { AspectRatio, Card, HStack, Image, Spacer, Text } from "@chakra-ui/react";

import { DogModel, getDogAge, getGenderTitle, getSizeTitle} from "@models/DogModel";

type DogCardProps = {
    dog: DogModel
}

export default function DogCard({ dog } : DogCardProps) {
    return (
        <Card.Root key={dog.id} overflow="hidden" w="100%">
            <Card.Header p={0}>
                <AspectRatio ratio={1} h={260}>
                    <Image src={
                        `${dog.imageURL ? dog.imageURL : 'https://meredith.nhcrafts.org/wp-content/uploads/dog-placeholder.jpg'}`
                    } />
                </AspectRatio>
            </Card.Header>
            <Card.Body p={4}>
                <Card.Title lineHeight={1.5}>
                    <HStack>
                        {dog.name}
                        <Spacer />
                        <Text fontSize={"sm"}>{getGenderTitle(dog.gender)}</Text>
                    </HStack>
                </Card.Title>
                <Card.Description as="div">
                    <HStack>
                        {/*getBreedTitle(dog.breed)*/}
                        {/*<LuDot style={{ padding: 0, margin: -6 }}/>*/}
                        {getDogAge(dog)}
                        <Spacer />
                        {/*<LuDot style={{ padding: 0, margin: -6 }}/>*/}
                        {getSizeTitle(dog.size)}
                    </HStack>
                </Card.Description>
            </Card.Body>
        </Card.Root>
    )
}