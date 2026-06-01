import { DateValue, parseDate as parse } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";

export function parseDate(date: Date) : DateValue {
    return parse(date)
}

export function getLocalTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function toTimestamp(date: DateValue): Timestamp {
    return Timestamp.fromDate(date.toDate(getLocalTimezone()))
}
