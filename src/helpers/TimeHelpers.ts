import { Timestamp } from "firebase/firestore";
import { differenceInMonths, differenceInYears } from "date-fns";

import { CalendarDateTime, getLocalTimeZone, today } from "@internationalized/date";

import { DateValue, parseDate as parse } from "@chakra-ui/react";

import { DogModel } from "@models/DogModel";

export function parseDate(date: Date) : DateValue {
    return parse(date)
}

export function createDate(dayOffset: number, time: string) : CalendarDateTime {
    const date = today(getLocalTimeZone()).add({ days: dayOffset, });
    const [hour, minute] = time.split(":").map(Number);

    return new CalendarDateTime(date.year, date.month, date.day, hour, minute);
}

export function toTimestamp(date: DateValue): Timestamp {
    return Timestamp.fromDate(date.toDate(getLocalTimeZone()))
}

export function getDogAge(dog: DogModel) : string {
    const date = dog.birthday.toDate()
    const now = new Date()

    const years = differenceInYears(now, date)
    if (years > 0) {
        return `${years} year${years === 1 ? "" : "s"}`;
    }

    const months = differenceInMonths(now, date)
    return `${months} month${months === 1 ? "" : "s"}`;
}
