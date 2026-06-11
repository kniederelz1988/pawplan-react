import { Timestamp } from "firebase/firestore"

export declare type VolunteerModel = {
    id?: string
    userId: string
    birthday: Timestamp
    volunteerSince: Timestamp
    name: string
}