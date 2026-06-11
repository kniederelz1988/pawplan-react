export const AppointmentTypeEnum = {
    Walk: 0,
} as const
export type AppointmentRole = typeof AppointmentTypeEnum[keyof typeof AppointmentTypeEnum]

export function getUserRoleTitle(role: AppointmentRole) {
    switch (role) {
        case AppointmentTypeEnum.Walk:
            return "Walk"
    }

}