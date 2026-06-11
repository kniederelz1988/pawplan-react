import { Timestamp } from "firebase/firestore";
import { differenceInMonths, differenceInYears } from "date-fns";

import { CalendarDate, CalendarDateTime, getLocalTimeZone, today } from "@internationalized/date";

import { DateValue, parseDate } from "@chakra-ui/react";

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

export function getDateFromToday(dayOffset: number) : CalendarDate {
    const timezone = getLocalTimeZone()
    return today(timezone).add({ days: dayOffset })
}

export function getDifferenceInYearOrMonth(date: Date, referenceDate: Date) : string
{
    const years = differenceInYears(referenceDate, date)
    if (years > 0) {
        return `${years} year${years === 1 ? "" : "s"}`;
    }

    const months = differenceInMonths(referenceDate, date)
    return `${months} month${months === 1 ? "" : "s"}`;
}

export function getDayAsString(date: CalendarDateTime) : string {
    const timezone = getLocalTimeZone()
    return date.toDate(timezone).toLocaleDateString()
}
export function getTimeAsString(date: CalendarDateTime) : string {
    const timezone = getLocalTimeZone()
    return date.toDate(timezone).toLocaleTimeString()
}
