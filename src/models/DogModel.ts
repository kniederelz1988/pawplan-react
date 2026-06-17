import { Timestamp } from "firebase/firestore"
import { DogGender, DogGenderEnum } from "@models/enums/DogGender"
import { DogSize, DogSizeEnum } from "@models/enums/DogSize"
import { getDifferenceInYearOrMonth } from "@helpers/TimeHelpers"

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
    imageURL: string
}

export function getBreedTitle(breed: string) {
    if(!breed) {
        return "unknown"
    }

    return breed
}

export function getGenderTitle(gender: DogGender) {
    switch(gender) {
        case DogGenderEnum.Female:
            return "Female";
        case DogGenderEnum.FemaleCastrated:
            return "Female (Castrated)"
        case DogGenderEnum.Male:
            return "Male"
        case DogGenderEnum.MaleCastrated:
            return "Male (Castrated)"
    }
}

export function getSizeTitle(size: DogSize) {
    switch (size) {
        case DogSizeEnum.Small:
            return "Small"
        case DogSizeEnum.Mid:
            return "Mid"
        case DogSizeEnum.Big:
            return "Big"
    }
}

export function getDogAge(dog: DogModel) : string {
    return getDifferenceInYearOrMonth(dog.birthday.toDate(), new Date())
}