import { Timestamp } from "firebase/firestore";
import { differenceInMonths, differenceInYears } from "date-fns";

import { CalendarDate, CalendarDateTime, getLocalTimeZone, today } from "@internationalized/date";

import { DateValue, parseDate } from "@chakra-ui/react";

export function dateToDateValue(date: Date) : DateValue {
    return parseDate(date)
}
export function dateValueToDate(dateValue: DateValue) : Date {
    const timezone = getLocalTimeZone()
    return dateValue.toDate(timezone)
} 

export function timestampToDateValue(timestamp: Timestamp) : DateValue {
    return dateToDateValue(timestamp.toDate())
}
export function dateValueToTimestamp(dateValue: DateValue) : Timestamp {
    const date = dateValueToDate(dateValue)
    return Timestamp.fromDate(date)
}

export function dateToTimestamp(date: Date) : Timestamp {
    const dateValue = dateToDateValue(date)
    return dateValueToTimestamp(dateValue)
}
export function timestampToDate(timestamp: Timestamp) : Date {
    const timezone = getLocalTimeZone()
    const dateValue = timestampToDateValue(timestamp)
    return dateValue.toDate(timezone)
}

export function getDateFromToday(dayOffset: number) : CalendarDate {
    const timezone = getLocalTimeZone()
    return today(timezone).add({ days: dayOffset })
}
export function dateToday() : Date {
    const dateValue = getDateFromToday(0)
    return dateValueToDate(dateValue)
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
