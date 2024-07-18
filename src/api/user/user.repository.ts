import { PrismaClient } from '@prisma/client';
import { RegisterDto } from '../../types/dto/auth.dto';

const prisma = new PrismaClient();

const createUser = async (registerUserDto: RegisterDto) => {
  const user = await prisma.user.create({
    data: {
      email: registerUserDto.email,
      username: registerUserDto.username,
      password: registerUserDto.password,
      nickname: registerUserDto.nickname,
      introduce: registerUserDto.introduce,
    },
  });
  return user;
};

const deleteUser = async (username: string) => {
  return await prisma.user.delete({
    where: {
      username: username,
    },
  });
};

const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};

const findUserByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  return user;
};

export const UserRepository = {
  createUser,
  deleteUser,
  findUserByEmail,
  findUserByUsername,
};
