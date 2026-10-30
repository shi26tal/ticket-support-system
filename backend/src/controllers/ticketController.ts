import * as ticketService from "../services/ticketService.js";
import { Request, Response } from "express";


export const createTicket = async (req: Request, res: Response) => {
  try {
    const customerId = Number(req.headers["x-auth-user-id"]);
    const ticket = await ticketService.createTicketService(customerId, req.body);
    return res.status(201).json({ message: "Ticket created", ticket });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};