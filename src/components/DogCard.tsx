import { Button, Card, HStack, Image, Spacer, Text } from "@chakra-ui/react";
import { useAuthContext } from "@contexts/AuthContexts";
import { useDialogueContext } from "@contexts/DialogueContext";
import { getDogAge } from "@helpers/TimeHelpers";
import { getBreedTitle } from "@models/DogBreed";
import { DogModel } from "@models/DogModel";
import { DialogueType } from "@models/enums/DialogueType";
import { getGenderTitle } from "@models/enums/DogGenderEnum";
import { getSizeTitle } from "@models/enums/DogSizeEnum";
import { LuDot } from "react-icons/lu";

export default function DogCard({ dog } : { 
    dog: DogModel
}) {
    const user = useAuthContext()
    const dialogueContext = useDialogueContext()

    function onClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        
        if (user == null) {
            dialogueContext.openDialogue(DialogueType.UserLogin)
            return
        }

        dialogueContext.openDialogue(DialogueType.AppointmentBooking, dog)
    }
    

    return (
        <Card.Root maxW="sm" overflow="hidden">
            <Image height={210}
                src="https://images.dog.ceo/breeds/shiba/shiba-15.jpg"
                alt="Green double couch with wooden legs"
            />
            <Card.Body gap={0} p={4} pb={2}>
                <Card.Title lineHeight={1.5}>
                    <HStack>
                        {dog.name}
                        <Spacer />
                        <Text fontSize={"sm"}>{getGenderTitle(dog.gender)}</Text>
                    </HStack>
                </Card.Title>
                <Card.Description as="div">
                    <HStack>
                        {getBreedTitle(dog.breed)}
                        <LuDot style={{ padding: 0, margin: -6 }}/>
                        {getDogAge(dog)}
                        <LuDot style={{ padding: 0, margin: -6 }}/>
                        {getSizeTitle(dog.size)}
                    </HStack>
                </Card.Description>
            </Card.Body>
            <Card.Footer p={4} pt={2}>
                <Button variant="solid" w="100%" onClick={onClick}>Meet {dog.name}</Button>
            </Card.Footer>
        </Card.Root>
    )
}