import passport from "passport";
import { Request, Response, NextFunction } from "express";
import createError from "http-errors";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err: Error, user: Express.User, info: any) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return next(createError(401, { name: 'Unauthorized Error', message: 'Unauthorized' }));
        }

        req.user = user;
        next();
    })(req, res, next);
};