import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validateBody } from '../../validators/validateBody';
import { LoginDto, RegisterDto } from '../../types/dto/auth.dto';
import { authMiddleware } from '../../passport/authMiddleware';

export const authRouter = Router();

authRouter.post('/register', validateBody(RegisterDto), AuthController.register);
authRouter.post('/login', validateBody(LoginDto), AuthController.login);
authRouter.delete('/withdrawal', authMiddleware, AuthController.withdrawal);

authRouter.post('/refresh', AuthController.refresh);
authRouter.get('/check', authMiddleware, AuthController.check);
