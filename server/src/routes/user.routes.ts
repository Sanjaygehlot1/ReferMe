import { Router } from "express";
import { signUpUser } from "../controllers/user.controller.ts";

export const router = Router()

router.post("/sign-up", signUpUser)
