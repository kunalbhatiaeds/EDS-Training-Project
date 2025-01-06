import express, { Application } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import employeeRoutes from './routes/employeeRoutes';
import cors from 'cors';
import morgan from 'morgan';

// Load environment variables from .env file
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(morgan('dev')); // Log HTTP requests

// Routes
app.use('/login', authRoutes); // Auth-related routes
app.use('/employees', employeeRoutes); // Employee-related routes

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running!' });
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
