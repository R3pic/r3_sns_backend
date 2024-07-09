import { UserRepository } from '../user/user.repository';
import createError from 'http-errors';

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async getUserbyId(userid: string) {
        const user = await this.userRepository.findUserByUserId(userid);
        if (!user) {
            throw createError(404, { name: 'Not Found Error', message: 'User does not exist' });
        }

        return {
            nickname: user.nickname,
            userid: user.userid,
        };
    }

    async getUserbyEmail(email: string) {
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