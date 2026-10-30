import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorize.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { registerSchema } from "../validations/authValidation.js";
import { createAgentController } from "../controllers/adminController.js";

const router = express.Router();

router.post(
  "/agents",
  authenticateToken,
  authorize("ADMIN"),
  validateRequest(registerSchema),
  createAgentController,
);

export default router;