import { UserRepository } from '../user/user.repository';
import { RegisterDto } from 'src/types/dto/auth.dto';
import createError from 'http-errors';

export class AuthService {
    private readonly userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async register(registerDto: RegisterDto) {
        const user = await this.userRepository.findUserByEmail(registerDto.email);

        if (user) {
            throw createError(409, { name: 'Conflict Error', message: 'User already exists' });
        }

        await this.userRepository.createUser(registerDto);

        return {
            email: registerDto.email,
            nickname: registerDto.nickname,
            userid: registerDto.userid,
        };
    }
}