import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorize.js";
import { validate } from "zod";
import { validateRequest } from "../middleware/validateRequest.js";
import { createTicketSchema } from "../validations/ticketValidation.js";
import { createTicket } from "../controllers/ticketController.js";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  authorize("CUSTOMER"),
  validateRequest(createTicketSchema),
  createTicket,
);

export default router