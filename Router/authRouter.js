import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import { validateLoginInput, validateRegisterInput } from '../middleware/ValidationMiddleware.js';

const router = Router();


router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);

export default router;
