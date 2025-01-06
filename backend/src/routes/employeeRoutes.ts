// employeeRoute.ts
import { Router } from 'express';
import { validateJWT } from '../middleware/authMiddleware'; // JWT validation middleware
import { getEmployees, getEmployeeById } from '../controllers/employeeController'; // Controller functions for employees

const router = Router();

// GET /employees - Returns a list of employees (requires valid JWT)
router.get('/', validateJWT, getEmployees);

// GET /employees/:id - Returns employee data by ID (requires valid JWT)
router.get('/:id', validateJWT, getEmployeeById);

export default router;
