import { Timestamp } from "firebase/firestore"
import { AppointmentStatus } from "@models/enums/AppointmentStatus"

export declare type AppointmentModel = {
    id?             : string
    dogId           : string,
    volunteerId     : string,
    createdAt       : Timestamp,
    date            : Timestamp
    type            : number
}
export declare type AppointmentStatusModel = {
    id?             : string
    appointmentId   : string
    dogId           : string
    volunteerId     : string
    status          : AppointmentStatus
    updateAt        : Timestamp
    updatedBy       : string
}
export declare type AppointmentRatingModel = {
    id?             : string
    appointmentId   : string
    dogId           : string
    volunteerId     : string
    updateAt        : Timestamp
    rating          : number
    comment         : string
}

export declare type Appointment = {
    id              : string,
    data            : AppointmentModel       | undefined,
    status          : AppointmentStatusModel | undefined,
    rating          : AppointmentRatingModel | undefined
}
export declare type AppointmentCollection = { 
    all:        Appointment[]
}
export declare type PagedAppointmentCollection = {
    appointments: Appointment[],
    page: number,
    previousPage: () => void, 
    previousPageActive: boolean, 
    nextPage: () => void, 
    nextPageActive: boolean
}
