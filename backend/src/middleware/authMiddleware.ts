import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: number | string;
  username: string;
  role: string;
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // check if the token is authenticate or not

  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new Error("no authorization in header");
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "token not found" });
  }

  const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error("no secret key");
    }

  try {
    
    const decoded = jwt.verify(token, secretKey) as TokenPayload;

   

    next();
  } catch (error) {
    return res.status(500).json({ message: "unauthorized" });
  }
};
