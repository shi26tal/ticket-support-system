import { Request, Response } from "express";
import { createUser, loginUser } from "../services/authService.js";

export const registerUser = async (req: Request, res: Response) => {
  try {
    // userService bata import gareko and just await and call it and pass the req.body
    // so that userService can get access to req.body (name,email,password)
    const user = await createUser(req.body);

    res.status(201).json({
      message: "user register successfully",
      user,
    });
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
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req.body);

    return res.status(200).json(result);
  } catch (error) {

    if(error instanceof Error){
      if (error.message === "invalid credentials") {
      return res.status(401).json({
        message: error.message,
      });
    }

  }

    res.status(500).json({
      message: "something went wrong",
    });
  }
};


