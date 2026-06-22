import { HStack, Text, VStack } from "@chakra-ui/react"
import { Time } from "@internationalized/date"

type TimeProps = {
    time: Time
}

export default function TimeDisplay({ time } : TimeProps) {
    return (
        <VStack m="auto" gap={0}>
            <Text fontSize="sm" fontWeight="bold">{time.hour}:{time.minute.toString().padStart(2, '0')}</Text>
            <Text fontSize="xs">{time.hour < 12 ? "am" : "pm"}</Text>
        </VStack>
    )
}
