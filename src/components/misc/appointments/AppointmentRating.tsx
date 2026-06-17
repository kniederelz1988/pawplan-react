import { Box, HStack, VStack, Text, Heading, Icon } from "@chakra-ui/react";
import { timestampToDate } from "@helpers/TimeHelpers";
import { useVolunteer } from "@repos/hooks/VolunteerHooks";
import { AppointmentRatingModel } from "@models/AppointmentModel";
import { LuStar } from "react-icons/lu";

type AppointmentRatingProps = {
    rating: AppointmentRatingModel
};

export function AppointmentRating({ rating }: AppointmentRatingProps) {
    const locale = navigator.language

    const { volunteer } = useVolunteer()

    return (
        <Box w="full" bgColor={"secondary.bg"} borderColor={"secondary.fg"} borderRadius={"2xl"} borderWidth={"xs"} boxShadow={"sm"}  p={4}>
            <VStack align="stretch" gap={2}>
                <HStack justify="space-between" align="start">
                    <VStack align="start" gap={0}>
                        <Heading size="sm">{volunteer?.name}</Heading>
                        <Text color="fg.muted" fontSize="xs">
                            {timestampToDate(rating.updateAt).toLocaleString(locale)}
                        </Text>
                    </VStack>

                    <HStack gap={1}>
                        {
                            Array.from({ length: 5 }).map((_, index) => (
                                <Icon key={index} as={LuStar} fill={index < rating.rating ? "bg.inverted" : "none"} />
                            ))
                        }
                    </HStack>
                </HStack>

                <Text whiteSpace="pre-wrap">
                    {rating.comment}
                </Text>
            </VStack>
        </Box>
    );
}