import * as ticketService from "../services/ticketService.js";
import { Request, Response } from "express";
import { listTicketsQuerySchema } from "../validations/ticketValidation.js";
import { Role } from "../../generated/prisma/enums.js";


export const createTicket = async (req: Request, res: Response) => {
  try {
    const customerId = Number(req.headers["x-auth-user-id"]);
    const ticket = await ticketService.createTicketService(customerId, req.body);
    return res.status(201).json({ message: "Ticket created", ticket });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};

export const listTickets = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.headers["x-auth-user-id"]);
    const role = req.headers["x-auth-role"] as Role;

    const parsed = listTicketsQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      });
    }

    const result = await ticketService.getTickets(userId, role, parsed.data);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
        message: "tickets not found"
    })
  }
};

export const getTicket = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid ticket id" });
    }

    const userId = Number(req.headers["x-auth-user-id"]);
    const role = req.headers["x-auth-role"] as Role;

    const ticket = await ticketService.getTicketById(id, userId, role);
    return res.status(200).json({ ticket });
  } catch (error) {
    return res.status(404).json({
        message: "not found"
    })
  }
};