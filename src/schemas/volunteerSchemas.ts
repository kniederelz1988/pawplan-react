import * as yup from "yup"

export const volunteerEditSchema = yup.object({
    name: yup
        .string()
        .min(5, "Name must be at least 5 letters")
        .required("Name is required"),

    birthday: yup
        .date()
        .required("Birthday is required"),
})