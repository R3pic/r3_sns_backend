import user from '../database/database.memory';
import { CreateUserDto } from 'src/types/dto/user.dto';

const createUser = async (createUserDto: CreateUserDto) => {
    const newUser = {
        id: user.length + 1,
        email: createUserDto.email,
        userid: createUserDto.userid,
        password: createUserDto.password,
        nickname: createUserDto.nickname,
    };
    user.push(newUser);
    return newUser;
}

const findUserByEmail = async (email: string) => {
    return user.find((u) => u.email === email);
}

const findUserByUserId = async (userid: string) => {
    return user.find((u) => u.userid === userid);
}

export const userRepository = {
    createUser,
    findUserByEmail,
    findUserByUserId,
}