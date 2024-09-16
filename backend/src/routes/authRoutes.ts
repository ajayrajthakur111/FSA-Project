import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

export const authRoute = Router();
authRoute.post('/register', register);
authRoute.post('/login', login);
