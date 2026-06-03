import { Button, Grid, HStack, RadioCard, Spacer, Text, VStack } from "@chakra-ui/react";
import { DogModel } from "@models/DogModel";

type AppointmentBookingDialogueFormProps = {
    dog: DogModel,
    onClose: () => void
}

export default function AppointmentBookingDialogueForm({ dog, onClose } : AppointmentBookingDialogueFormProps) {
    const timeSlots = [
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00"
    ];

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        onClose()
    }
    function handleReset(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        onClose()
    }
    
    return (
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <RadioCard.Root>
                <RadioCard.Label>Choose a date</RadioCard.Label>
                <Grid templateColumns="repeat(7, 1fr)" gap={2}>
                    {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                        <RadioCard.Item key={item} value={item.toString()}>
                            <RadioCard.ItemHiddenInput />
                            <RadioCard.ItemControl bgColor={"whiteAlpha.700"} p={2}>
                                <VStack m="auto" gap="0">
                                    <Text fontSize="xs">Wed</Text>
                                    <Text fontSize="sm" fontWeight="bold">{item}</Text>
                                </VStack>
                            </RadioCard.ItemControl>
                        </RadioCard.Item>
                    ))}
                </Grid>
            </RadioCard.Root>

            <Spacer h={4}/>

            <RadioCard.Root>
                <RadioCard.Label>Choose a time</RadioCard.Label>
                <Grid templateColumns="repeat(5, 1fr)" gap={4}>
                    {timeSlots.map((item) => (
                        <RadioCard.Item key={item} value={item.toString()}>
                            <RadioCard.ItemHiddenInput />
                            <RadioCard.ItemControl bgColor={"whiteAlpha.700"} p={2}>
                                <HStack m="auto" gap={1}>
                                    <Text fontSize="xs" fontWeight="bold">{item}</Text>
                                    <Text fontSize="xs">am</Text>
                                </HStack>
                            </RadioCard.ItemControl>
                        </RadioCard.Item>
                    ))}
                </Grid>
            </RadioCard.Root>
            
            <Spacer h={8} />

            <Button type="submit" w="100%">Confirm visit</Button>
        </form>
    )
}