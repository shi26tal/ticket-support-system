import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorize.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { registerSchema } from "../validations/authValidation.js";
import { assignTicketController, createAgentController, getUsers, updateUserActive } from "../controllers/adminController.js";
import { assignTicketSchema, setActiveSchema } from "../validations/adminValidation.js";

const router = express.Router();

// every admin route needs a valid token AND the ADMIN role
router.use(authenticateToken, authorize("ADMIN"));

router.post("/agents", validateRequest(registerSchema), createAgentController);
router.get("/users", getUsers);
router.patch("/users/:id/active", validateRequest(setActiveSchema), updateUserActive);
router.patch("/tickets/:id/assign", validateRequest(assignTicketSchema), assignTicketController);



export default router;
