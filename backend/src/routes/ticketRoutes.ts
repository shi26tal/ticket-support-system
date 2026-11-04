import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorize.js";
import { validate } from "zod";
import { validateRequest } from "../middleware/validateRequest.js";
import { createMessageSchema, createTicketSchema, updateStatusSchema } from "../validations/ticketValidation.js";
import { createTicket, getTicket, listMessages, listTickets, postMessage, updateTicketStatus } from "../controllers/ticketController.js";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  authorize("CUSTOMER"),
  validateRequest(createTicketSchema),
  createTicket,
);
router.get("/",authenticateToken,listTickets);
router.get("/:id",authenticateToken,getTicket)

router.patch("/:id/status",authenticateToken,validateRequest(updateStatusSchema),updateTicketStatus)

router.post("/:id/messages",authenticateToken,validateRequest(createMessageSchema),postMessage)
router.get("/:id/messages",authenticateToken,listMessages)


export default router