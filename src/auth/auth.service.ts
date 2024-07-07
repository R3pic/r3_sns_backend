import { UserRepository } from '../user/user.repository';
import { RegisterDto, LoginDto } from 'src/types/dto/auth.dto';
import createError from 'http-errors';
import bcrypt from 'bcrypt';

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

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        registerDto.password = hashedPassword;

        const newUser = await this.userRepository.createUser(registerDto);

        return {
            email: newUser.email,
            nickname: newUser.nickname,
            userid: newUser.userid,
        };
    }

    async login(loginDto: LoginDto) {
        const user = await this.userRepository.findUserByUserId(loginDto.userid);

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
            userid: user.userid,
        };
    }
}