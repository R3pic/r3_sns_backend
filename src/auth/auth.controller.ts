import { Router } from 'express';
import { authService } from './auth.service';
import { validateBody } from '../validator/validateBody';
import { RegisterDto } from '../types/dto/auth.dto';

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
authController.post('/register', validateBody(RegisterDto), authService.register);