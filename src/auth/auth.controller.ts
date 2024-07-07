import { Router, Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { validateBody } from '../validator/validateBody';
import { RegisterDto } from '../types/dto/auth.dto';

const authService = new AuthService();
export const authController = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              email:
 *                type: string
 *              userid:
 *                type: string
 *              nickname:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *       201:
 *         description: Created successfully
 *       400:
 *        description: Bad request
 *       409:
 *        description: Conflict
 */
authController.post('/register', validateBody(RegisterDto), async (req: Request, res: Response, next: NextFunction) => {
    const registerDto: RegisterDto = req.body;
    try {
        const result = await authService.register(registerDto);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});