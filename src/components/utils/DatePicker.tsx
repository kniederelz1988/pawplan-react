import { DatePickerContent, DatePickerControl, DatePickerDayTable, DatePickerHeader, DatePickerIndicatorGroup, DatePickerInput, DatePickerLabel, DatePickerMonthTable, DatePickerPositioner, DatePickerRoot, DatePickerRootProps, DatePickerTrigger, DatePickerView, DatePickerYearTable, Portal } from "@chakra-ui/react";
import { LuCalendar } from "react-icons/lu";

export default function DatePicker({ children, ...props }: DatePickerRootProps) {
    return (
        <DatePickerRoot {...props}>
            <DatePickerLabel>{children}</DatePickerLabel>
            <DatePickerControl>
            <DatePickerInput />
            <DatePickerIndicatorGroup>
                <DatePickerTrigger>
                    <LuCalendar />
                </DatePickerTrigger>
            </DatePickerIndicatorGroup>
            </DatePickerControl>
            <Portal>
            <DatePickerPositioner>
                <DatePickerContent>
                <DatePickerView view="day">
                    <DatePickerHeader />
                    <DatePickerDayTable />
                </DatePickerView>
                <DatePickerView view="month">
                    <DatePickerHeader />
                    <DatePickerMonthTable />
                </DatePickerView>
                <DatePickerView view="year">
                    <DatePickerHeader />
                    <DatePickerYearTable />
                </DatePickerView>
                </DatePickerContent>
            </DatePickerPositioner>
            </Portal>
        </DatePickerRoot>
    )
}