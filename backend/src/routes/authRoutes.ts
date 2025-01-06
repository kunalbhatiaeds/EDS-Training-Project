import express from 'express';
import { login } from '../controllers/authController';

const router = express.Router();

// Define the /auth endpoint
router.post('/', login);

export default router;
