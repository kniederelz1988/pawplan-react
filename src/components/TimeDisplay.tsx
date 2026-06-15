import { HStack, Text } from "@chakra-ui/react"
import { Time } from "@internationalized/date"

type TimeProps = {
    time: Time
}

export default function TimeDisplay({ time } : TimeProps) {
    return (
        <HStack m="auto" gap={1}>
            <Text fontSize="xs" fontWeight="bold">{time.hour}:{time.minute.toString().padStart(2, '0')}</Text>
        </HStack>
    )
}
