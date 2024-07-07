import { NextFunction, Request, Response } from 'express';
import { userRepository } from '../user/user.repository';
import createError from 'http-errors';

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log('Getting user');
    if (!req.params) {
        return next(createError(400, { name: 'Bad Request', message: 'Userid is required' }));
    }

    const { userid } = req.params;
    if (userid) {
        const user = await userRepository.findUserByUserId(userid);
        if (!user) {
            return next(createError(404, { name: 'Not Found Error', message: 'User does not exist' }));
        }

        res.status(200).send({
            message: 'User found',
            data: {
                nickname: user.nickname,
                userid: user.userid,
            },
        });
    }
}

export const userService = {
    getUser,
}