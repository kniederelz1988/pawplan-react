import { useCallback, useMemo } from "react";
import { NavLink } from 'react-router-dom';

import { Button, Card, Heading, HStack, Spacer, Text, VStack } from "@chakra-ui/react";

import { useLocalVolunteerRole } from "@repos/hooks/VolunteerHooks";

import { useDialogueContext } from "@contexts/hooks/useDialogueContext";

import { DogModel, getDogAge, getGenderTitle, getSizeTitle} from "@models/DogModel";

import DogEditButton from "@components/misc/dogs/DogEditButton";
import DogFavouriteButton from "@components/misc/dogs/DogFavouriteButton";
import { FaMagnifyingGlass, FaRegCalendar } from "react-icons/fa6";

import { creatUserInsufficientRightsDialogueData } from "@components/dialogues/functions/createUserInsuffientRightsDialogueData";

type DogAppointmentCardProps = {
    dog: DogModel
}

export default function DogOverviewCard({ dog } : DogAppointmentCardProps) {
    const { volunteer, role } = useLocalVolunteerRole()
    
    const dialogueContext = useDialogueContext()

    const onMeetClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        
        if (!volunteer) {
            dialogueContext.openDialogue({ type: "userLogin" })
            return
        }

        if (role == "observer") {
            const data = creatUserInsufficientRightsDialogueData()
            dialogueContext.openDialogue({ type: "userInsuffientRights", data: data})
            return
        }

        dialogueContext.openDialogue({ type: "appointmentBooking", data: { dog: dog }})
    }, [dog, volunteer, role, dialogueContext])
    
    const titleId = useMemo(() => `dog-${dog.id}-title`, [dog])

    return (
        <Card.Root key={dog.id} overflow="hidden" as="article" aria-labelledby={titleId}>
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
                        <Heading as="h2" id={titleId} size="md">{dog.name}</Heading>
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
                    <Button w="100%" variant={"subtle"} asChild>
                        <NavLink to={`dog/${dog.id}`}>
                            <FaMagnifyingGlass aria-hidden="true"/> More about {dog.name}
                        </NavLink>
                    </Button>
                    <Button w="100%" onClick={onMeetClick}>
                        <FaRegCalendar  aria-hidden="true"/> Meet {dog.name}
                    </Button>  
                </VStack>
            </Card.Footer>
        </Card.Root>
    )
}