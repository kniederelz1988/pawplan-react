export const AppointmentStatusEnum = {
    Pending:    0,
    Confirmed:  1,
    Canceled:   2,
    Completed:  3
} as const
export type AppointmentStatus = typeof AppointmentStatusEnum[keyof typeof AppointmentStatusEnum]

export function getAppointmentStatusTitle(status: AppointmentStatus): string {
    switch (status) {
        case AppointmentStatusEnum.Pending:
            return "Pending"
        case AppointmentStatusEnum.Confirmed:
            return "Confirmed"
        case AppointmentStatusEnum.Completed:
            return "Completed"
        case AppointmentStatusEnum.Canceled:
            return "Canceled"
    }
}

export function getAppointmentStatusColor(status: AppointmentStatus): string {
    switch (status) {
        case AppointmentStatusEnum.Pending:
            return "yellow"
        case AppointmentStatusEnum.Confirmed:
            return "gray"
        case AppointmentStatusEnum.Completed:
            return "green"
        case AppointmentStatusEnum.Canceled:
            return "red"
    }
}