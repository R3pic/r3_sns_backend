import { UserRepository } from '../user/user.repository';
import createError from 'http-errors';
import { UserProfileDto } from '../../types/dto/user.dto';

export class UserService {
    constructor(private userRepository: UserRepository) {}

    getUserbyId = async (userid: string): Promise<UserProfileDto> => {
        const user = await this.userRepository.findUserByUsername(userid);
        if (!user) {
            throw createError(404, { name: 'Not Found Error', message: 'User does not exist' });
        }

        return {
            username: user.username,
            nickname: user.nickname,
            introduce: user.introduce,
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
            introduce: user.introduce
        };
    }
}