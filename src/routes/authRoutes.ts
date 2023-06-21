import express from 'express';
import { validateUser } from '../middlewares/authMiddleware';
import { signup, login } from '../controllers/authController';

const router = express.Router();

router.post('/signup', validateUser, signup);
router.post('/login', validateUser, login);

export default router;
