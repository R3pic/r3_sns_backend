import { UserRepository } from '../user/user.repository';
import { RegisterDto, LoginDto } from 'src/types/dto/auth.dto';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';

export class AuthService {
    private readonly userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    register = async (registerDto: RegisterDto) => {
        const user = await this.userRepository.findUserByEmail(registerDto.email);

        if (user) {
            throw createError(409, { name: 'Conflict Error', message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, process.env.SALT_ROUNDS || 10);
        registerDto.password = hashedPassword;

        const newUser = await this.userRepository.createUser(registerDto);

        return {
            email: newUser.email,
            nickname: newUser.nickname,
            username: newUser.username,
        };
    }

    login = async (loginDto: LoginDto) => {
        const user = await this.userRepository.findUserByUsername(loginDto.username);

        if (!user) {
            throw createError(404, { name: 'Not Found Error', message: 'User does not exist' });
        }

        const isPasswordMatch = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordMatch) {
            throw createError(401, { name: 'Unauthorized Error', message: 'Password is incorrect' });
        }

        return {
            email: user.email,
            nickname: user.nickname,
            username: user.username,
        };
    }

    withdrawal = async (user: User) => {
        if (!user) {
            throw createError(404, { name: 'Not Found Error', message: 'User does not exist' });
        }

        await this.userRepository.deleteUser(user.username);

        return {
            message: 'User has been deleted',
        };
    }

    getAccessToken = (user: {}) => {
        return jwt.sign(user, process.env.JWT_ACCESS_SECRET || 'asdf', { expiresIn: '1h' });
    }

    getRefreshToken = (user: {}) => {
        return jwt.sign(user, process.env.JWT_REFRESH_SECRET || 'fdsa', { expiresIn: '14d' });
    }

    refresh = async (refreshToken: string) => {
        try {
            const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'fdsa';
            const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as { username: string };
            const user = await this.userRepository.findUserByUsername(decoded.username);

            if (!user) {
                throw createError(404, { name: 'Not Found Error', message: 'User does not exist' });
            }

            return {
                username: user.username,
                email: user.email,
                nickname: user.nickname,
            };
        } catch (error) {
            throw createError(401, { name: 'Unauthorized Error', message: 'Invalid refresh token' });
        }
    }
}