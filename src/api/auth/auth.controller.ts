import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from '../../types/dto/auth.dto';
import passport from 'passport';
import { User } from '@prisma/client';
import createHttpError from 'http-errors';

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
const register = async (req: Request, res: Response, next: NextFunction) => {
  const registerDto: RegisterDto = req.body;
  try {
    const result = await AuthService.register(registerDto);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
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
const login = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'local',
    { session: false },
    (err: Error, user: Express.User, info: any) => {
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
          const accessToken = AuthService.getAccessToken(user);
          const refreshToken = AuthService.getRefreshToken(user);
          res.cookie('accessToken', accessToken, { httpOnly: true, secure: false });
          res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false });
          res.status(200).json(user);
        } catch (error) {
          next(error);
        }
      });
    },
  )(req, res, next);
};

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
const withdrawal = async (req: Request, res: Response, next: NextFunction) => {
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
        const result = await AuthService.withdrawal(user);
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    });
  })(req, res, next);
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies['refreshToken'];

  if (!refreshToken) {
    return next(
      createHttpError(405, { name: 'Unauthorized Error', message: 'Refresh token is required' }),
    );
  }

  try {
    const payload = await AuthService.refresh(refreshToken);
    const accessToken = AuthService.getAccessToken(payload);
    res.cookie('accessToken', accessToken, { httpOnly: true, secure: false });
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};

const check = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as User;
  res.status(200).json({
    username: user.username,
    email: user.email,
    nickname: user.nickname,
  });
};

export const AuthController = {
  register,
  login,
  withdrawal,
  refresh,
  check,
};
