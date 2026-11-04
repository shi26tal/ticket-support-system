import { Request, Response } from "express";
import { createAgent } from "../services/authService.js"
import { listUsersQuerySchema } from "../validations/adminValidation.js";
import * as adminService from "../services/adminService.js"

export const createAgentController = async(req:Request,res:Response)=> {
    try {
        const agent = await createAgent(req.body);
        return res.status(201).json({
            message: "Agent created",
            agent
        })
    } catch (error) {
    if (error instanceof Error) {
      if (error.message === "user with this email already exists") {
        return res.status(500).json({
          message: error.message,
        });
      }
    }

    res.status(500).json({
      message: "something went wrong",
    });
  }
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const parsed = listUsersQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid role filter" });
    }
    const users = await adminService.listUsers(parsed.data.role);
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(400).json({message:"get request failed"})
  }
};

export const updateUserActive = async (req: Request, res: Response) => {
  try {
    const targetId = Number(req.params.id);
    if (!Number.isInteger(targetId) || targetId <= 0) {
      return res.status(400).json({ message: "Invalid user id" });
    }
    const adminId = Number(req.headers["x-auth-user-id"]);
    const user = await adminService.setUserActive(targetId, adminId, req.body.isActive);
    return res.status(200).json({ message: "User updated", user });
  } catch (error) {
    return res.status(400).json({message:"update request failed"})
  }
};

export const assignTicketController = async (req: Request, res: Response) => {
  try {
    const ticketId = Number(req.params.id);
    if (!Number.isInteger(ticketId) || ticketId <= 0) {
      return res.status(400).json({ message: "Invalid ticket id" });
    }
    const ticket = await adminService.assignTicket(ticketId, req.body.agentId);
    return res.status(200).json({ message: "Ticket assigned", ticket });
  } catch (error) {
    return res.status(400).json({message:"assign request failed"})
  }
};
    