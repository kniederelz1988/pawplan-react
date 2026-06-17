import { Badge, BadgeProps } from "@chakra-ui/react"
import { VolunteerRole, VolunteerRoleEnum } from "@models/enums/UserRoleType"

type ProfileBadgeProps = {
    role: VolunteerRole
}

export default function ProfileBadge({ role, ...props } : ProfileBadgeProps & Omit<BadgeProps, "role">) {
    switch (role) {
        case VolunteerRoleEnum.Observer:
            return (<Badge {...props}>Observer</Badge>)
        case VolunteerRoleEnum.Volunteer:
            return (<Badge colorPalette={"green"} {...props}>Volunteer</Badge>)
        case VolunteerRoleEnum.Admin:
            return <Badge colorPalette={"red"} {...props}>Admin</Badge>
    }
}