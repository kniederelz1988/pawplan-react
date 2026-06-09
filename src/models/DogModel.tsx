import { Timestamp } from "firebase/firestore"
import { DogGender } from "@models/enums/DogGender"
import { DogSize } from "@models/enums/DogSize"

export declare type DogModel = {
    id?: string
    name: string
    birthday: Timestamp
    shelterDate: Timestamp
    adoptionDateValid: boolean
    adoptionDate: Timestamp
    breed: string
    gender: DogGender
    size: DogSize
    imageUrl: string
}