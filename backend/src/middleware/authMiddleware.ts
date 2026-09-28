import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

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
    return res.status(400).json({ message: "token not found" });
  }

  try {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error("no secret key");
    }
    const decoded = jwt.verify(token, secretKey);

   

    next();
  } catch (error) {
    return res.status(400).json({ message: "unauthorized" });
  }
};
