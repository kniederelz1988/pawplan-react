import { useCallback, useMemo, useState } from "react";
import { Button, Grid, HStack, RadioCard, Spacer, Text, VStack } from "@chakra-ui/react";

import { getDateFromToday } from "@helpers/TimeHelpers";

import { CalendarDate, CalendarDateTime, getLocalTimeZone, Time } from "@internationalized/date";

import { DogModel } from "@models/DogModel";

type DayProps = {
    date: Date
}

function DayDisplay({ date } : DayProps) {
    return (
        <VStack m="auto" gap="0">
            <Text fontSize="xs">{date.toLocaleDateString(navigator.language, { weekday: "short" })}</Text>
            <Text fontSize="sm" fontWeight="bold">{date.getDate()}</Text>
        </VStack>
    )
}

type TimeProps = {
    time: Time
}

function TimeDisplay({ time } : TimeProps) {
    return (
        <HStack m="auto" gap={1}>
            <Text fontSize="xs" fontWeight="bold">{time.hour}:{time.minute.toString().padStart(2, '0')}</Text>
        </HStack>
    )
}

type AppointmentBookingDialogueFormProps = {
    dog: DogModel,
    onConfirm: (dog: DogModel, datetime: CalendarDateTime) => void,
    onClose: () => void
}

export default function AppointmentBookingDialogueForm({ dog, onConfirm, onClose } : AppointmentBookingDialogueFormProps) {
    const [date, setDate] = useState<CalendarDate>()
    const [time, setTime] = useState<Time>()
    
    const daySlots = useMemo(() => [
        getDateFromToday(1), 
        getDateFromToday(2),
        getDateFromToday(3),
        getDateFromToday(4),
        getDateFromToday(5),
        getDateFromToday(6),
        getDateFromToday(7)    
    ], [])
    const timeSlots = useMemo(() => [
        new Time(10),
        new Time(10, 30),
        new Time(11),
        new Time(11, 30),
        new Time(12),
        new Time(12, 30),
        new Time(13),
        new Time(13, 30),
        new Time(14),
        new Time(14, 30),
        new Time(15),
        new Time(15, 30),
        new Time(16),
        new Time(16, 30),
        new Time(17)
    ], []);

    const handleSubmit = useCallback((e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!date || !time)
            return

        const dateTime = new CalendarDateTime(
            date.year, 
            date.month, 
            date.day, 
            time.hour, 
            time.minute
        )
        console.log(dateTime)
        onConfirm(dog, dateTime)
    }, [date, time, dog])

    const handleReset = useCallback((e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        onClose()
    }, [])

    function onDayOffsetChanged(details: RadioCard.ValueChangeDetails) {
        if (!details.value)
            return

        const index = parseInt(details.value)
        setDate(daySlots[index])
    }
    function onTimeChanged(details: RadioCard.ValueChangeDetails) {
        if (!details.value)
            return

        const index = parseInt(details.value)
        setTime(timeSlots[index])
    }
    
    return (
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <RadioCard.Root onValueChange={onDayOffsetChanged}>
                <RadioCard.Label>Choose a date</RadioCard.Label>
                <Grid templateColumns="repeat(7, 1fr)" gap={2}>
                    {daySlots.map((item, index) => (
                        <RadioCard.Item key={index} value={index.toString()}>
                            <RadioCard.ItemHiddenInput />
                            <RadioCard.ItemControl bgColor={"whiteAlpha.700"} p={2}>
                                <DayDisplay date={item.toDate(getLocalTimeZone())} />
                            </RadioCard.ItemControl>
                        </RadioCard.Item>
                    ))}
                </Grid>
            </RadioCard.Root>

            <Spacer h={4}/>

            <RadioCard.Root name="time" onValueChange={onTimeChanged}>
                <RadioCard.Label>Choose a time</RadioCard.Label>
                <Grid templateColumns="repeat(5, 1fr)" gap={4}>
                    {timeSlots.map((item, index) => (
                        <RadioCard.Item key={index} value={index.toString()}>
                            <RadioCard.ItemHiddenInput />
                            <RadioCard.ItemControl bgColor={"whiteAlpha.700"} p={2}>
                                <TimeDisplay time={item} />
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