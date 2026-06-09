import { Timestamp } from "firebase/firestore"

export declare type VolunteerModel = {
    id?: string
    admin?: boolean
    birthday: Timestamp
    volunteerSince: Timestamp
    favoriteDogIds: string[]
    name: string
    userId: string
}