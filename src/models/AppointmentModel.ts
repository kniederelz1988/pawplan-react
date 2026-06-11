import { Timestamp } from "firebase/firestore"
import { AppointmentStatus } from "@models/enums/AppointmentStatus"

export declare type AppointmentModel = {
    id?: string
    dogId: string,
    volunteerId: string,
    createdAt: Timestamp,
    date: Timestamp
    type: any
}
export declare type AppointmentStatusModel = {
    status: AppointmentStatus
    updateAt: Timestamp
    updatedBy: string
}

export declare type Appointment = {
    data  : AppointmentModel,
    metaData: AppointmentStatusModel
}
export declare type AppointmentCollection = { 
    all:        Appointment[]
}
export declare type PagedAppointmentCollection = {
    appointments: Appointment[],
    previousPage: () => void, 
    previousPageActive: boolean, 
    nextPage: () => void, 
    nextPageActive: boolean
}
