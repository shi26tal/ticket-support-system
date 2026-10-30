import { Request, Response } from "express";
import { createAgent } from "../services/authService.js"


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
    