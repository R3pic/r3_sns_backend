import { Database } from '../database/database.memory';
import { CreateUserDto, User } from '../types/dto/user.dto';

export class UserRepository {
    async createUser(createUserDto: CreateUserDto) {
        const newUser = {
            id: Database.user.length + 1,
            email: createUserDto.email,
            userid: createUserDto.userid,
            password: createUserDto.password,
            nickname: createUserDto.nickname,
        };
        Database.user.push(newUser);
        return newUser;
    }

    async findUserByEmail(email: string): Promise<User | undefined> {
        return Database.user.find((u) => u.email === email);
    }

    async findUserByUserId(userid: string): Promise<User | undefined> {
        return Database.user.find((u) => u.userid === userid);
    }
}