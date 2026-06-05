export enum DogGenderEnum {
    Female = 0,
    FemaleCastrated = 1,
    Male = 2,
    MaleCastrated = 3
}

export function getGenderTitle(gender: DogGenderEnum) {
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