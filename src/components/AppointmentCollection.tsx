import { useEffect, useMemo } from "react";
import { Button, Center, Container, Flex, Text } from "@chakra-ui/react";

import { DogModel } from "@models/DogModel";

import { Appointment, PagedAppointmentCollection } from "@models/AppointmentModel";
import AppointmentCard from "@components/AppointmentCard";

export type AppointmentCategory = {
    title: string,
    appointments: Appointment[],

    editable?: boolean
    confirmable?: boolean
    cancelable?: boolean
}

export type AppointmentCollectionProps = {
    collection: PagedAppointmentCollection,
    pageControls?: boolean,
    createCategories: (appointment: Appointment[]) => AppointmentCategory[]

    onEdit: (appointment: Appointment) => void,
    onConfirm: (appointment: Appointment, dog: DogModel) => void,
    onCancel: (appontment: Appointment, dog: DogModel) => void
}

export function AppointmentCollection({ collection, pageControls, createCategories, onEdit, onConfirm, onCancel} 
    : AppointmentCollectionProps
) {
    const categories = useMemo(() => {
        return createCategories(collection.appointments)
    }, [collection])

    return (<>
        <Flex direction={"column"} gap={4}>
        {
            categories.map((c, i) => 
                <Container key={c.title+i} p={0}>
                    {c.title && <Text fontVariant="all-petite-caps">{c.title}</Text>}
                    <Flex flexDirection="column" maxW="100%" gap={2} mt={2}>
                        {
                            c.appointments.map(t => 
                                <AppointmentCard appointment={t} 
                                    editable={c.editable} onEdit={onEdit} 
                                    cancelable={c.cancelable} onCancel={onCancel}
                                    confirmable={c.confirmable} onConfirm={onConfirm} 
                                />
                            )
                        }
                    </Flex>
                </Container>
            )
        }
        </Flex>

        {
            pageControls &&
                <Center gap={4} mt={4}>
                    <Button onClick={collection.previousPage} disabled={!collection.previousPageActive}>
                        Prev
                    </Button>
                    <Text w={16} textAlign={"center"} fontSize={"sm"} fontWeight={"bold"}>{collection.page}</Text>
                    <Button onClick={collection.nextPage} disabled={!collection.nextPageActive}>
                        Next
                    </Button>
                </Center>
        }
    </>)
}