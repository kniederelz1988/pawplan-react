import { useMemo } from "react"

import { Badge, BadgeProps } from "@chakra-ui/react"
import { VolunteerRole } from "@models/enums/UserRoleType"

type ProfileBadgeProps = {
    role: VolunteerRole
}

export default function ProfileBadge({ role, ...props } : ProfileBadgeProps & Omit<BadgeProps, "role">) {

    const badge = useMemo(() => {
        switch (role) {
            case "observer":
                return (<Badge {...props}>Observer</Badge>)
            case "volunteer":
                return (<Badge colorPalette={"green"} {...props}>Volunteer</Badge>)
            case "admin":
                return (<Badge colorPalette={"red"} {...props}>Admin</Badge>)
        }
    }, [role])

    return badge
}