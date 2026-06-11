import { useCallback } from "react";
import { Button, Card, HStack, IconButton, Spacer, Text } from "@chakra-ui/react";

import { HiHeart } from "react-icons/hi";
import { LuDot } from "react-icons/lu";
import { PiPencil } from "react-icons/pi";

import { VolunteerRoleEnum } from "@models/enums/UserRoleType";
import { useVolunteer, useVolunteerRole } from "@hooks/VolunteerHooks";

import { useDialogueContext } from "@contexts/DialogueContext";
import { DialogueTypeEnum } from "@models/enums/DialogueType";

import { DogModel, getBreedTitle, getDogAge, getGenderTitle, getSizeTitle} from "@models/DogModel";

type DogCardProps = {
    dog: DogModel
}

export default function DogCard({ dog } : DogCardProps) {
    const { volunteer, isFavourite, toggleFavourite } = useVolunteer()
    const { role } = useVolunteerRole(volunteer)

    const dialogueContext = useDialogueContext()

    const onEditDogClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();

        if (volunteer == null) {
            dialogueContext.openDialogue(DialogueTypeEnum.UserLogin)
            return
        }

        dialogueContext.openDialogue(DialogueTypeEnum.DogEdit, { dog: dog })
    }, [volunteer])

    const onFavouriteDogClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();

        if (volunteer == null) {
            dialogueContext.openDialogue(DialogueTypeEnum.UserLogin)
            return
        }

        toggleFavourite(dog)
    }, [volunteer, toggleFavourite])

    const onBookAppointmentClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        
        if (volunteer == null) {
            dialogueContext.openDialogue(DialogueTypeEnum.UserLogin)
            return
        }

        dialogueContext.openDialogue(DialogueTypeEnum.AppointmentBooking, { dog: dog })
    }, [volunteer, dog])
    
    return (
        <Card.Root key={dog.id} overflow="hidden">
            <Card.Header p={0}>
                <HStack height={210} 
                    align="start"
                    bgImage="url('https://images.dog.ceo/breeds/shiba/shiba-15.jpg')" 
                    bgSize="cover"
                    bgPos="center"
                    p={2}
                >   
                    { 
                        volunteer && role == VolunteerRoleEnum.Admin &&
                            <IconButton variant="subtle" borderRadius={24} bgColor={"whiteAlpha.700"} onClick={onEditDogClick}>
                                <PiPencil />
                            </IconButton>
                    }

                    <Spacer />

                    <IconButton variant="subtle" borderRadius={24} bgColor={"whiteAlpha.700"} onClick={onFavouriteDogClick}>
                        <HiHeart color={isFavourite(dog) ? "red" : "black"} />
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