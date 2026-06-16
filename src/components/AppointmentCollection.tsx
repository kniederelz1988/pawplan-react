import { Button, Center, Flex, Text } from "@chakra-ui/react";

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
 
    isEditable?: (appointment: Appointment) => boolean,
    onEdit?: (appointment: Appointment) => void,

    isConfirmable?: (appointment: Appointment) => boolean,
    onConfirm?: (appointment: Appointment, dog: DogModel) => void,

    isCancelable?: (appointment: Appointment) => boolean,
    onCancel?: (appontment: Appointment, dog: DogModel) => void
}

export function AppointmentCollection({ collection, pageControls, isEditable, onEdit, isConfirmable, onConfirm, isCancelable, onCancel} 
    : AppointmentCollectionProps
) {
    return (<>
        <Flex direction={"column"} gap={4}>
        {
            collection.appointments.map((a, _) => 
                <AppointmentCard appointment={a} 
                    editable={isEditable?.(a)} onEdit={onEdit} 
                    cancelable={isCancelable?.(a)} onCancel={onCancel}
                    confirmable={isConfirmable?.(a)} onConfirm={onConfirm} 
                />
            )
        }
        </Flex>

        {
            pageControls &&
                <Center gap={4} mt={4}>
                    <Button onClick={collection.previousPage} disabled={!collection.previousPageActive}>
                        Prev
                    </Button>
                    <Text w={16} textAlign={"center"} fontSize={"sm"} fontWeight={"bold"}>{collection.page + 1}</Text>
                    <Button onClick={collection.nextPage} disabled={!collection.nextPageActive}>
                        Next
                    </Button>
                </Center>
        }
    </>)
}