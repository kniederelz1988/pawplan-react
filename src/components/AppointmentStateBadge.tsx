import { Badge } from "@chakra-ui/react";
import { AppointmentStatus, getAppointmentStatusColor, getAppointmentStatusTitle } from "@models/enums/AppointmentStatus";

type AppointmentStateBadgeProps = {
    status: AppointmentStatus
}

export default function AppointmentStateBadge({ status } : AppointmentStateBadgeProps) {
    return (
        <Badge w="100%" minW={24} h={4} m="auto" justifyContent={"center"} colorPalette={getAppointmentStatusColor(status)}>
            {getAppointmentStatusTitle(status)}
        </Badge>
    )
}