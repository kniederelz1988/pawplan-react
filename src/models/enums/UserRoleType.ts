export const VolunteerRoleEnum = {
    Observer: 0,
    Volunteer: 1,
    Admin: 10
} as const
export type VolunteerRole = typeof VolunteerRoleEnum[keyof typeof VolunteerRoleEnum]

export function getUserRoleTitle(role: VolunteerRole) {
    switch (role) {
        case VolunteerRoleEnum.Observer:
            return "Observer"
        case VolunteerRoleEnum.Volunteer:
            return "Volunteer"
        case VolunteerRoleEnum.Admin:
            return "Admin"
    }

}