import { Timestamp } from "firebase/firestore"

export declare type DogModel = {
    id?: string
    name: string
    birthday: Timestamp
    shelterDate: Timestamp
    adoptionDateValid: boolean
    adoptionDate: Timestamp
    breed: string
    gender: number
    size: number
    imageUrl: string
}