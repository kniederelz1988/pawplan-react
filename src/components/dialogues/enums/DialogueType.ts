export const DialogueTypeEnum = {
    None:               0,

    UserRegister:       1,
    UserLogin:          2,

    AppointmentBooking: 11,
    AppointmentEdit:    12,
    AppointmentCancel:  13,
    AppointmentComplete:14,

    DogAdd:             21,
    DogEdit:            22,
    UserEdit:           23
} as const
export type DialogueType = typeof DialogueTypeEnum[keyof typeof DialogueTypeEnum]