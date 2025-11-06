import { Router } from "express";
import { getProfile, loginUser, signUpUser,logOutUser, buyProductSimulation } from "../controllers/user.controller.ts";
import { AuthMiddleware } from "../middlewares/auth.middleware.ts";

export const router = Router()

router.post("/sign-up", signUpUser)
router.post("/login", loginUser)
router.get("/profile",AuthMiddleware, getProfile)
router.get("/logout",AuthMiddleware, logOutUser)
router.get("/buy-product",AuthMiddleware, buyProductSimulation)
