import { Timestamp } from "firebase/firestore";
import { DogAddDialogueData } from "../DogAddDialogue";
import { DogGenderEnum } from "@models/enums/DogGender";
import { DogSizeEnum } from "@models/enums/DogSize";

export function createDogAddDialogueData() : DogAddDialogueData {
    return {
        dog: {
            name: "",
            birthday: Timestamp.now(),
            shelterDate: Timestamp.now(),
            adoptionDateValid: false,
            adoptionDate: Timestamp.now(),
            breed: "",
            gender: DogGenderEnum.Female,
            size: DogSizeEnum.Small,
            imageURL: "",
            description: ""
        }
    }
}