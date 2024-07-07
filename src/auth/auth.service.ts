import { NextFunction, Request, Response } from 'express';
import { userRepository } from '../user/user.repository';
import { RegisterDto } from 'src/types/dto/auth.dto';
import createError from 'http-errors';

const register = async (req: Request, res: Response, next: NextFunction) => {
    const registerDto = req.body as RegisterDto;
    const user = await userRepository.findUserByEmail(registerDto.email);

    if (user) {
        return next(createError(409, { name: 'Conflict Error', message: 'User already exists' }));
    }

    userRepository.createUser(registerDto);
    res.status(201).send({
        message: 'Created successfully',
        data: {
            email: registerDto.email,
            nickname: registerDto.nickname,
            userid: registerDto.userid,
        }
    });
}

export const authService = {
    register,
}