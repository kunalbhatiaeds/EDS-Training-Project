import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

// JWT Validation Middleware
export const validateJWT = (req: Request, res: Response, next: NextFunction): void => {
  // Extract the token from the 'Authorization' header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    // Pass error to the error-handling middleware
    return next(new Error('No token provided'));
  }

  try {
    // Verify the JWT using the secret key
    jwt.verify(token, process.env.JWT_SECRET_KEY || 'eds123');
    // Token is valid, proceed to the next middleware or route
    next();
  } catch (error) {
    // Pass error to the error-handling middleware
    next(new Error('Invalid token'));
  }
};

// Login Validation Middleware (with express-validator)
export const validateLogin = [
  // Validate email field to check if it is a valid email address
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address'),

  // Validate password length to ensure it's at least 6 characters long
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  // Custom middleware to handle validation errors
  (req: Request, res: Response, next: NextFunction): void => {
    // Get validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Pass errors to the error-handling middleware
      return next(new Error('Validation failed'));
    }
    // If validation passes, proceed to the next middleware or route
    next();
  }
];
