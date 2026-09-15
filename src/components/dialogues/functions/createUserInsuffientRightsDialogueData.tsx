import { UserInsufficientRightsDialogueData } from "../UserInsufficientRightsDialogue";

export function creatUserInsufficientRightsDialogueData() 
    : UserInsufficientRightsDialogueData {
    return { 
        title: "Not enough rights", 
        description: "You don't have enough rights! Please contact your animal shelter",

        confirm: "Okay",
        cancel: "",
    }
}
