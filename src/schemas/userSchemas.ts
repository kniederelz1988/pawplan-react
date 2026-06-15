import * as yup from "yup"

export const userRegisterSchema = yup.object({
    email: yup
        .string()
        .min(5, "E-Mail must be at least 5 characters...")
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i, "E-Mail must be a valid email address...")
        .required("E-Mail required..."),
        
    password: yup
        .string()
        .required("Password is required")
        .matches(/^(?=.*[A-Z])(?=.*\d).{6,}$/,
            "Min 6 chars, 1 uppercase, 1 number"),

    name: yup
        .string()
        .min(5, "Name must be at least 5 letters")
        .required("Name is required"),
})

export const userLoginSchema = yup.object({
    email: yup
        .string()
        .min(5, "E-Mail must be at least 5 characters...")
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i, "E-Mail must be a valid email address...")
        .required("E-Mail required..."),
        
    password: yup
        .string()
        .required("Password is required")
        .matches(/^(?=.*[A-Z])(?=.*\d).{6,}$/,
            "Min 6 chars, 1 uppercase, 1 number"),
})
