import { Timestamp } from "firebase/firestore";
import { differenceInMonths, differenceInYears } from "date-fns";

import { CalendarDateTime, getLocalTimeZone, today } from "@internationalized/date";

import { DateValue, parseDate } from "@chakra-ui/react";

import { DogModel } from "@models/DogModel";

export function dateToDateValue(date: Date) : DateValue {
    return parseDate(date)
}
export function timestampToDateValue(timestamp: Timestamp) : DateValue {
    return dateToDateValue(timestamp.toDate())
}
export function dateValueToTimestamp(dateValue: DateValue) : Timestamp {
    const timezone = getLocalTimeZone()
    const date = dateValue.toDate(timezone)
    return Timestamp.fromDate(date)
}

export function createDate(dayOffset: number, time: string) : CalendarDateTime {
    const date = today(getLocalTimeZone()).add({ days: dayOffset, });
    const [hour, minute] = time.split(":").map(Number);

    return new CalendarDateTime(date.year, date.month, date.day, hour, minute);
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
