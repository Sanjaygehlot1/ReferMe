import { Router } from "express";
import { loginUser, signUpUser } from "../controllers/user.controller.ts";

export const router = Router()

router.post("/sign-up", signUpUser)
router.post("/login", loginUser)
