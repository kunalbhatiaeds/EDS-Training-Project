import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const secretKey = process.env.JWT_SECRET_KEY || 'eds123';

export const login = [
  // Validate email and password
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  // Handle login and validation errors
  (req: Request, res: Response): void => {
    // Check if there are validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body;

    // Static credentials for simplicity
    const validEmail = 'kunal@gmail.com';
    const validPassword = 'password123';

    if (email === validEmail && password === validPassword) {
      const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  },
];
