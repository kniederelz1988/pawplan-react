import { useCallback, useMemo, useState } from "react";
import { AspectRatio, Button, Grid, HStack, RadioCard, Spacer } from "@chakra-ui/react";

import { getDateFromToday } from "@helpers/TimeHelpers";

import { CalendarDate, CalendarDateTime, getLocalTimeZone, Time } from "@internationalized/date";

import { DogModel } from "@models/DogModel";
import TimeDisplay from "@components/forms/displays/TimeDisplay";
import DayDisplay from "@components/forms/displays/DayDisplay";

type AppointmentFormProps = {
    dog: DogModel,
    onConfirm: (dog: DogModel, datetime: CalendarDateTime) => void,
    onClose: () => void
}

export default function AppointmentForm({ dog, onConfirm, onClose } : AppointmentFormProps) {
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
            <RadioCard.Root name="day" onValueChange={onDayOffsetChanged}>
                <RadioCard.Label fontWeight={"bold"}>Choose a date</RadioCard.Label>
                <Grid templateColumns="repeat(7, 1fr)" gap={2}>
                    {daySlots.map((item, index) => (
                        <RadioCard.Item key={index} value={index.toString()}>
                            <RadioCard.ItemHiddenInput />
                            <RadioCard.ItemControl p={2}>
                                <DayDisplay date={item.toDate(getLocalTimeZone())} />
                            </RadioCard.ItemControl>
                        </RadioCard.Item>
                    ))}
                </Grid>
            </RadioCard.Root>

            <Spacer h={4} />

            <RadioCard.Root name="time" onValueChange={onTimeChanged}>
                <RadioCard.Label fontWeight={"bold"}>Choose a time</RadioCard.Label>
                <Grid templateColumns="repeat(5, 1fr)" gap={4}>
                    {timeSlots.map((item, index) => (
                        <RadioCard.Item key={index} value={index.toString()}>
                            <RadioCard.ItemHiddenInput />
                            <RadioCard.ItemControl p={2}>
                                <TimeDisplay time={item} />
                            </RadioCard.ItemControl>
                        </RadioCard.Item>
                    ))}
                </Grid>
            </RadioCard.Root>
            
            <Spacer h={4} />

            <HStack mx={0} mt={2}>
                <Spacer />
            
                <Button type="submit" w="30%" disabled={!time || !date}>Confirm</Button>
            </HStack>
        </form>
    )
}