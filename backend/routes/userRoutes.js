import express from "express";
import { registerUser, loginUser } from "../controllers/userContoller.js";

const router = express.Router();

// POST /api/user/register
router.post("/register", registerUser);

// POST /api/user/login
router.post("/login", loginUser);

export default router;
