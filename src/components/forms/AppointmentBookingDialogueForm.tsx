import { Button, DateValue, Grid, HStack, RadioCard, Spacer, Text, VStack } from "@chakra-ui/react";
import { createDate } from "@helpers/TimeHelpers";
import { DogModel } from "@models/DogModel";
import { useCallback, useMemo, useState } from "react";

type AppointmentBookingDialogueFormProps = {
    dog: DogModel,
    onConfirm: (dog: DogModel, datetime: DateValue) => void,
    onClose: () => void
}

export default function AppointmentBookingDialogueForm({ dog, onConfirm, onClose } : AppointmentBookingDialogueFormProps) {
    const [dayOffset, setDayOffset] = useState(0)
    const [time, setTime] = useState("09:00")
    
    const timeSlots = useMemo(() => [
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
    ], []);

    const handleSubmit = useCallback((e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        const date = createDate(dayOffset, time)
        onConfirm(dog, date)
    }, [dog])
    const handleReset = useCallback((e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        onClose()
    }, [])

    function onDayOffsetChanged(details: RadioCard.ValueChangeDetails) {
        setDayOffset(details.value ? parseInt(details.value) : 0)
    }
    function onTimeChanged(details: RadioCard.ValueChangeDetails) {
        setTime(details.value ? details.value : "09:00")
    }
    
    return (
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <RadioCard.Root onValueChange={onDayOffsetChanged}>
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

            <RadioCard.Root name="time" onValueChange={onTimeChanged}>
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