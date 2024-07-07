import { PrismaClient } from "@prisma/client";
import { CreateUserDto, User } from '../types/dto/user.dto';

export class UserRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async createUser(createUserDto: CreateUserDto) {
        const user = await this.prisma.user.create({
            data: {
                email: createUserDto.email,
                userid: createUserDto.userid,
                password: createUserDto.password,
                nickname: createUserDto.nickname,
            },
        });

        return user;
    }

    async findUserByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        return user;
    }

    async findUserByUserId(userid: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                userid: userid,
            },
        });

        return user;
    }
}