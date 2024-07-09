import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from '../../types/dto/auth.dto';

export class AuthController {
    constructor(private readonly authService: AuthService) {
        this.authService = authService;
    }
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
    async register(req: Request, res: Response, next: NextFunction) {
        const registerDto: RegisterDto = req.body;
        try {
            const result = await this.authService.register(registerDto);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }
    /**
     * @swagger
     * /auth/login:
     *   post:
     *     summary: Login
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *              userid:
     *                type: string
     *              password:
     *                type: string
     *     responses:
     *      200:
     *        description: OK
     *      400:
     *        description: Bad request
     *      401:
     *        description: Unauthorized
     *      404:
     *        description: Not Found
     */
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.authService.login(req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}