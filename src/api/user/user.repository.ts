import { PrismaClient } from '@prisma/client';
import { RegisterDto } from '../../types/dto/auth.dto';

export class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(registerUserDto: RegisterDto) {
    const user = await this.prisma.user.create({
      data: {
        email: registerUserDto.email,
        username: registerUserDto.username,
        password: registerUserDto.password,
        nickname: registerUserDto.nickname,
        introduce: registerUserDto.introduce,
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
