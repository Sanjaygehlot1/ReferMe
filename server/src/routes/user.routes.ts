import { Router } from "express";
import { getProfile, loginUser, signUpUser } from "../controllers/user.controller.ts";
import { AuthMiddleware } from "../middlewares/auth.middleware.ts";

export const router = Router()

router.post("/sign-up", signUpUser)
router.post("/login", loginUser)
router.get("/profile",AuthMiddleware, getProfile)
