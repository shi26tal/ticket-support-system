import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { getUsersController } from "../controllers/userController.js";

const router = express.Router()

router.get("/",authenticateToken,getUsersController)

export default router