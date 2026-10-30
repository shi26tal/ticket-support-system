import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../utils/generateToken.js";


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
    
    const payload = jwt.verify(token, secretKey) as JWTPayload;

    console.log(payload)

    // set the user information in the request headers so that it can be accessed in the next middleware or controller

     req.headers["x-auth-user"] = payload.username;
    req.headers["x-auth-user-id"] = String(payload.userId);
    req.headers["x-auth-role"] = payload.role;

   

    next();
  } catch (error) {
    return res.status(403).json({ message: "unauthorized" });
  }
};
