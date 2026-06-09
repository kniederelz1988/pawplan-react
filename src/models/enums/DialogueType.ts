export const DialogueTypeEnum = {
    None:               0,
    UserRegister:       1,
    UserLogin:          2,
    AppointmentBooking: 3,
    AppointmentEdit:    4,
    AppointmentCancel:  5,
    DogEdit:            6,
    UserEdit:           7
} as const
export type DialogueType = typeof DialogueTypeEnum[keyof typeof DialogueTypeEnum]