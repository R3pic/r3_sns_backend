import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from '../../types/dto/user.dto';

export class UserRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async createUser(createUserDto: CreateUserDto) {
        const user = await this.prisma.user.create({
            data: {
                email: createUserDto.email,
                username: createUserDto.username,
                password: createUserDto.password,
                nickname: createUserDto.nickname,
            },
        });

        return user;
    }

    async deleteUser(username: string) {
        await this.prisma.user.delete({
            where: {
                username: username,
            },
        });
    }

    async findUserByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        return user;
    }

    async findUserByUsername(username: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                username: username,
            },
        });

        return user;
    }
}