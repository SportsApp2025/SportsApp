import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export interface AuthenticatedRequest extends Request {
  userId?: string; // Custom userId property
}

export const isAuthenticated = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "User not authenticated", success: false });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token", success: false });
  }
};
