import { useCallback } from "react";
import { Button, Card, HStack, Spacer, Text, VStack } from "@chakra-ui/react";

import { VolunteerRoleEnum } from "@models/enums/UserRoleType";
import { useVolunteer, useVolunteerRole } from "@repos/hooks/VolunteerHooks";

import { useDialogueContext } from "@contexts/DialogueContext";
import { DialogueTypeEnum } from "@components/dialogues/enums/DialogueType";

import { DogModel, getDogAge, getGenderTitle, getSizeTitle} from "@models/DogModel";
import { useNavigate } from "react-router-dom";
import DogFavouriteButton from "./DogFavouriteButton";
import DogEditButton from "./DogEditButton";

type DogAppointmentCardProps = {
    dog: DogModel
}

export default function DogOverviewCard({ dog } : DogAppointmentCardProps) {
    const { volunteer } = useVolunteer()
    const { role } = useVolunteerRole(volunteer)

    const dialogueContext = useDialogueContext()
    const navigate = useNavigate()

    const onMeetClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        
        if (!volunteer) {
            dialogueContext.openDialogue(DialogueTypeEnum.UserLogin)
            return
        }

        if (role == VolunteerRoleEnum.Observer) {
            //dialogueContext.openDialogue(DialogueTypeEnum.InsufficientRights)
            return
        }

        dialogueContext.openDialogue(DialogueTypeEnum.AppointmentBooking, { dog: dog })
    }, [volunteer, role, dog])
    
    const onAboutClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault()

        if (!volunteer) {
            dialogueContext.openDialogue(DialogueTypeEnum.UserLogin)
            return
        }

        if (role == VolunteerRoleEnum.Observer) {
            //dialogueContext.openDialogue(DialogueTypeEnum.InsufficientRights)
            return
        }

        navigate(`dog/${dog.id}`)
    }, [volunteer, role, dog])
    
    return (
        <Card.Root key={dog.id} overflow="hidden">
            <Card.Header p={0}>
                <HStack height={210} 
                    align="start" bgImage={`url(${dog.imageURL ? dog.imageURL : 'https://meredith.nhcrafts.org/wp-content/uploads/dog-placeholder.jpg'})`} bgSize="cover" bgPos="center"
                    p={2}
                >   
                    <DogEditButton dog={dog} />
                    <Spacer />
                    <DogFavouriteButton dog={dog} />
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
                        {/*getBreedTitle(dog.breed)*/}
                        {/*<LuDot style={{ padding: 0, margin: -6 }}/>*/}
                        {getDogAge(dog)}
                        <Spacer />
                        {/*<LuDot style={{ padding: 0, margin: -6 }}/>*/}
                        {getSizeTitle(dog.size)}
                    </HStack>
                </Card.Description>
            </Card.Body>
            <Card.Footer p={2}>
                <VStack w="100%">
                    <Button variant="subtle" w="100%" onClick={onMeetClick}>Meet {dog.name}</Button>
                    <Button variant="solid" w="100%" onClick={onAboutClick}>More</Button>
                </VStack>   
            </Card.Footer>
        </Card.Root>
    )
}