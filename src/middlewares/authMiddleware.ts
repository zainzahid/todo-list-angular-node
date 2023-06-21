import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

export const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req['user'] = user;
    return next();
  });
};

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  // Validate email
  const { email } = req.body;
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ message: 'Email is required and should be a valid email address' });
  }

  // Validate password
  const { password } = req.body;
  if (!password || password.length < 8) {
    return res.status(400).json({ message: 'Password is required and should be at least 8 characters long' });
  }

  // If all validations pass, proceed to the next middleware/controller
  return next();
};

const isValidEmail = (email: string) => {
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

