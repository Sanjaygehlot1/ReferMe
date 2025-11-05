import * as z from "zod";

export const loginSchema = z.object({
    email : z
    .string()
    .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    password : z.string()
})

export const signUpSchema = z.object({
    name : z
    .string()
    .min(3, "Name should be atleast 3 characters long")
    .max(20, "Name should be atmost 20 characters long"),

    email : z
    .string()
    .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid Email "),

    password : z
    .string()
    .min(8, "Password should be atleast 8 characters long")
    .max(20, "Password should be atmost 20 characters long")
    .regex(/[A-Z]/, "Password should contain at least one uppercase letter")
    .regex(/[a-z]/, "Password should contain at least one lowercase letter")
    .regex(/[0-9]/, "Password should contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password should contain at least one special character"),
})