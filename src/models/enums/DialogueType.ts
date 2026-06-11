export const DialogueTypeEnum = {
    None:               0,

    UserRegister:       1,
    UserLogin:          2,

    AppointmentBooking: 11,
    AppointmentEdit:    12,
    AppointmentCancel:  13,
    AppointmentComplete:14,

    DogEdit:            21,
    UserEdit:           22
} as const
export type DialogueType = typeof DialogueTypeEnum[keyof typeof DialogueTypeEnum]