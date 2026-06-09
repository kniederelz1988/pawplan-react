export const DogGenderEnum = {
    Female:             0,
    FemaleCastrated:    1,
    Male:               2,
    MaleCastrated:     3
} as const
export type DogGender = typeof DogGenderEnum[keyof typeof DogGenderEnum]

export const AllDogGenders = [DogGenderEnum.Female, DogGenderEnum.FemaleCastrated, DogGenderEnum.Male, DogGenderEnum.MaleCastrated]

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