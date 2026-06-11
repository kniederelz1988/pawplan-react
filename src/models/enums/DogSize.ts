export const DogSizeEnum = {
    Small:  0,
    Mid:    1,
    Big:    2
} as const
export type DogSize = typeof DogSizeEnum[keyof typeof DogSizeEnum]

export const AllDogSizes = [DogSizeEnum.Small, DogSizeEnum.Mid, DogSizeEnum.Big]