export const DogGenderEnum = {
    Female:             0,
    FemaleCastrated:    1,
    Male:               2,
    MaleCastrated:     3
} as const
export type DogGender = typeof DogGenderEnum[keyof typeof DogGenderEnum]

export const AllDogGenders = [DogGenderEnum.Female, DogGenderEnum.FemaleCastrated, DogGenderEnum.Male, DogGenderEnum.MaleCastrated]