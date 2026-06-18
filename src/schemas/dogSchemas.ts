import * as yup from "yup"

export const dogFormSchema = yup.object({
    name: yup
        .string()
        .required("Name is required"),
    birthday: yup
        .date()
        .required("Birthday is required"),
    shelterday: yup
        .date()
        .required("Shelterday is required"),

    adoptionDateValid: yup
        .boolean()
        .required(),

    adoptionDate: yup
        .date()
        .when("adoptionDateValid", {
            is: "on",
            then: (s) => s.required("Adoption date is required"),
            otherwise: (s) => s.notRequired()
        }),

    gender: yup
        .array()
        .min(1, "min 1 gender")
        .max(1, "max 1 gender")
        .required("Gender is required"),
    
    size: yup
        .array()
        .min(1, "min 1 size")
        .max(1, "max 1 size")
        .required("Size is required"),

    description: yup
        .string()
        .min(500, "Description must be at least 500 characters")
        .max(1800, "Description must be 1800 character max")
        .required("Description is required")
})
