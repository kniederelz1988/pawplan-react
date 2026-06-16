import * as yup from "yup"

export const appointmentRatingSchema = yup.object({
    comment: yup
        .string()
        .min(30, "Comment must be at least 30 characters long...")
        .required("Comment is required")
})