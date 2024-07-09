import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from '../../types/dto/auth.dto';
import passport from 'passport';
import { User } from '@prisma/client';

export class AuthController {
    constructor(private readonly authService: AuthService) {}
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
    register = async (req: Request, res: Response, next: NextFunction) => {
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
    login = async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', { session: false }, (err: Error, user: Express.User, info: any) => {
            console.log('user', user);
            console.log('info', info);
            if (err) {
                return next(err);
            }

            if (!user) {
                return next(info);
            }

            req.logIn(user, { session: false }, async (err) => {
                if (err) {
                    return next(err);
                }
                try {
                    const accessToken = this.authService.getAccessToken(user);
                    res.cookie('accessToken', accessToken, { httpOnly: false, secure: false });
                    res.status(200).json(user);
                } catch (error) {
                    next(error);
                }
            });
        })(req, res, next);
    }

    /**
     * @swagger
     * /auth/withdrawal:
     *   delete:
     *     summary: Withdrawal
     *     tags: [Auth]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: header
     *         name: Authorization
     *         required: true
     *         schema:
     *           type: string
     *         description: Bearer token
     *     responses:
     *       200:
     *         description: OK
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Not Found
     */
    withdrawal = async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('jwt', { session: false }, (err: Error, user: User, info: any) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                return next(info);
            }

            req.logIn(user, { session: false }, async (err) => {
                if (err) {
                    return next(err);
                }
                try {
                    const result = await this.authService.withdrawal(user);
                    res.clearCookie('accessToken');
                    res.status(200).json(result);
                } catch (error) {
                    next(error);
                }
            });
        })(req, res, next);
    }
}