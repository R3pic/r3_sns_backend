import { UserRepository } from '../user/user.repository';
import createError from 'http-errors';

export class UserService {
    constructor(private userRepository: UserRepository) {}

    getUserbyId = async (userid: string) => {
        const user = await this.userRepository.findUserByUsername(userid);
        if (!user) {
            throw createError(404, { name: 'Not Found Error', message: 'User does not exist' });
        }

        return {
            nickname: user.nickname,
            username: user.username,
        };
    }

    getUserbyEmail = async (email: string) => {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw createError(404, { name: 'Not Found Error', message: 'User does not exist' });
        }

        return {
            nickname: user.nickname,
            username: user.username,
        };
    }
}