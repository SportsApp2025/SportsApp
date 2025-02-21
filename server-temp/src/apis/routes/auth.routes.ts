import express from "express";
import { signup, login, logout, getUserProfile } from "../controllers/auth.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", isAuthenticated, getUserProfile);

export default router;
