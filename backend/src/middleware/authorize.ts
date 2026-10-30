import { NextFunction, Request, Response } from "express";
import { JWTPayload } from "../utils/generateToken.js";

// authorize middleware to check if the user has the required role to access the route
export const authorize = (...roles: JWTPayload["role"][]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.headers["x-auth-role"] as JWTPayload["role"] | undefined;

    if (!role) {
      return res.status(403).json({
        message: "forbidden",
      });
    }
    next();
  };
};
