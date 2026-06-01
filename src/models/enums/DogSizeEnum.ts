export enum DogSizeEnum {
    Small = 0,
    Mid = 1,
    Big = 2
}

export function getSizeTitle(value: DogSizeEnum) {
    switch (value) {
        case DogSizeEnum.Small:
            return "Small"
        case DogSizeEnum.Mid:
            return "Mid"
        case DogSizeEnum.Big:
            return "Big"
    }
}