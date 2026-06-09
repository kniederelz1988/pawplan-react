import { Button, Card, HStack, IconButton, Spacer, Text } from "@chakra-ui/react";
import { useAuthContext } from "@contexts/AuthContexts";
import { useDialogueContext } from "@contexts/DialogueContext";
import { getDogAge } from "@helpers/TimeHelpers";
import { getBreedTitle } from "@models/DogBreed";
import { DogModel } from "@models/DogModel";
import { DialogueTypeEnum } from "@models/enums/DialogueType";

import { getGenderTitle } from "@models/enums/DogGender";
import { getSizeTitle } from "@models/enums/DogSize";
import { useCallback } from "react";
import { HiHeart } from "react-icons/hi";
import { LuDot } from "react-icons/lu";
import { PiPencil } from "react-icons/pi";

type DogCardProps = {
    dog: DogModel
}

export default function DogCard({ dog } : DogCardProps) {
    const user = useAuthContext()
    const dialogueContext = useDialogueContext()

    const onEditDogClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();

        if (user == null) {
            dialogueContext.openDialogue(DialogueTypeEnum.UserLogin)
            return
        }

        dialogueContext.openDialogue(DialogueTypeEnum.DogEdit, { dog: dog })
    }, [user])

    const onLikeDogClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();

        if (user == null) {
            dialogueContext.openDialogue(DialogueTypeEnum.UserLogin)
            return
        }

        console.log("like dog")
    }, [user])

    const onBookAppointmentClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        
        if (user == null) {
            dialogueContext.openDialogue(DialogueTypeEnum.UserLogin)
            return
        }

        dialogueContext.openDialogue(DialogueTypeEnum.AppointmentBooking, { dog: dog })
    }, [user, dog])
    
    return (
        <Card.Root overflow="hidden">
            <Card.Header p={0}>
                <HStack height={210} 
                    align="start"
                    bgImage="url('https://images.dog.ceo/breeds/shiba/shiba-15.jpg')" 
                    bgSize="cover"
                    bgPos="center"
                    p={2}
                >   
                    { 
                        user 
                            ? 
                                <IconButton variant="subtle" borderRadius={24} bgColor={"whiteAlpha.700"} onClick={onEditDogClick}>
                                    <PiPencil />
                                </IconButton>
                            : <></>
                    }

                    <Spacer />

                    <IconButton variant="subtle" borderRadius={24} bgColor={"whiteAlpha.700"} onClick={onLikeDogClick}>
                        <HiHeart />
                    </IconButton>
                </HStack>
            </Card.Header>
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
                <Button variant="solid" w="100%" onClick={onBookAppointmentClick}>Meet {dog.name}</Button>
            </Card.Footer>
        </Card.Root>
    )
}