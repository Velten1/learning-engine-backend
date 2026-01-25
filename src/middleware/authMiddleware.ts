//import jwt and request, response, next function
import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get access token from Authorization header (Bearer token)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "É necessário fazer login" });
    }

    const accessToken = authHeader.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({ message: "É necessário fazer login" });
    }

    // Verify access token using the new JWT utils
    const userId = verifyAccessToken(accessToken);

    // Attach userId to request
    (req as any).userId = userId;

    next();
  } catch (error: any) {
    // Handle specific error messages from verifyAccessToken
    const errorMessage = error.message || "Token inválido";
    return res.status(401).json({ message: errorMessage });
  }
};

export default authMiddleware;
