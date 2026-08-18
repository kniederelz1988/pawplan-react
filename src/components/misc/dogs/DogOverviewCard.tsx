import { useCallback } from "react";
import { NavLink } from 'react-router-dom';

import { Button, Card, HStack, IconButton, Link, Spacer, Span, Text, VStack } from "@chakra-ui/react";

import { useVolunteer, useVolunteerRole } from "@repos/hooks/VolunteerHooks";

import { useDialogueContext } from "@contexts/DialogueContext";
import { DialogueTypeEnum } from "@components/dialogues/enums/DialogueType";

import { DogModel, getDogAge, getGenderTitle, getSizeTitle} from "@models/DogModel";

import DogEditButton from "./DogEditButton";
import DogFavouriteButton from "./DogFavouriteButton";
import { creatUserInsufficientRightsDialogueData } from "@components/dialogues/UserInsufficientRightsDialogue";
import { FaMagnifyingGlass, FaRegCalendar } from "react-icons/fa6";

type DogAppointmentCardProps = {
    dog: DogModel
}

export default function DogOverviewCard({ dog } : DogAppointmentCardProps) {
    const { volunteer } = useVolunteer()
    const role = useVolunteerRole()

    const dialogueContext = useDialogueContext()

    const onMeetClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        
        if (!volunteer) {
            dialogueContext.openDialogue(DialogueTypeEnum.UserLogin)
            return
        }

        if (role == "observer") {
            const data = creatUserInsufficientRightsDialogueData()
            dialogueContext.openDialogue(DialogueTypeEnum.UserInsuffientRights, data)
            return
        }

        dialogueContext.openDialogue(DialogueTypeEnum.AppointmentBooking, { dog: dog })
    }, [volunteer, role, dog])
    
    return (
        <Card.Root key={dog.id} overflow="hidden" as="article" aria-label={dog.name}>
            <Card.Header p={0}>
                <HStack minH={210} aspectRatio={{ base: 1.5, md: 1 }}
                    align="start" bgImage={`url(${dog.imageURL ? dog.imageURL : 'https://meredith.nhcrafts.org/wp-content/uploads/dog-placeholder.jpg'})`} bgSize="cover" bgPos="center"
                    p={2}
                >   
                    <DogEditButton dog={dog} />
                    <Spacer />
                    <DogFavouriteButton dog={dog} />
                </HStack>
            </Card.Header>
            <Card.Body gap={0} p={4} pb={2}>
                <Card.Title lineHeight={1.5} as="div">
                    <HStack>
                        <Span as="p" aria-hidden="true">{dog.name}</Span>
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
                    <IconButton w="100%" variant={"subtle"} asChild>
                        <NavLink to={`dog/${dog.id}`}>
                            <FaMagnifyingGlass /> More about {dog.name}
                        </NavLink>
                    </IconButton>
                    <Button w="100%" onClick={onMeetClick}>
                        <FaRegCalendar /> Meet {dog.name}
                    </Button>  
                </VStack>
            </Card.Footer>
        </Card.Root>
    )
}