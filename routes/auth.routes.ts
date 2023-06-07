import { Router } from 'express';
import { loginValidation } from '../validations/auth.validation';
import AuthController from '../controllers/auth.controller';

const authController    = new AuthController();
const router:Router     = Router();

router.post('/login', [ ...loginValidation], authController.login);

export default router;