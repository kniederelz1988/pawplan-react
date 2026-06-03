import { Timestamp } from "firebase/firestore";
import { differenceInMonths, differenceInYears } from "date-fns";

import { DateValue, parseDate as parse } from "@chakra-ui/react";

import { DogModel } from "@models/DogModel";

export function parseDate(date: Date) : DateValue {
    return parse(date)
}

export function getLocalTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function toTimestamp(date: DateValue): Timestamp {
    return Timestamp.fromDate(date.toDate(getLocalTimezone()))
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
