import { Text, VStack } from "@chakra-ui/react"

type DayProps = {
    date: Date
}

export default function DayDisplay({ date } : DayProps) {
    return (
        <VStack m="auto" gap="0">
            <Text fontSize="xs">{date.toLocaleDateString(navigator.language, { weekday: "short" })}</Text>
            <Text fontSize="sm" fontWeight="bold">{date.getDate()}</Text>
        </VStack>
    )
}