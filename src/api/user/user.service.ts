import { UserRepository } from '../user/user.repository';
import createError from 'http-errors';

export class UserService {
    constructor(private userRepository: UserRepository) {}

    getUserbyId = async (userid: string) => {
        const user = await this.userRepository.findUserByUserId(userid);
        if (!user) {
            throw createError(404, { name: 'Not Found Error', message: 'User does not exist' });
        }

        return {
            nickname: user.nickname,
            userid: user.userid,
        };
    }

    getUserbyEmail = async (email: string) => {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw createError(404, { name: 'Not Found Error', message: 'User does not exist' });
        }

        return {
            nickname: user.nickname,
            userid: user.userid,
        };
    }
}