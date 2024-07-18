import { UserRepository } from '../user/user.repository';
import { RegisterDto, LoginDto } from 'src/types/dto/auth.dto';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';

const register = async (registerDto: RegisterDto) => {
  const userByemail = await UserRepository.findUserByEmail(registerDto.email);

  if (userByemail) {
    throw createError(409, { name: 'Conflict Error', message: 'User already exists' });
  }

  const userByusername = await UserRepository.findUserByUsername(registerDto.username);

  if (userByusername) {
    throw createError(409, { name: 'Conflict Error', message: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(registerDto.password, process.env.SALT_ROUNDS || 10);
  registerDto.password = hashedPassword;

  const newUser = await UserRepository.createUser(registerDto);

  return {
    username: newUser.username,
    nickname: newUser.nickname,
    email: newUser.email,
  };
};

const login = async (loginDto: LoginDto) => {
  const user = await UserRepository.findUserByUsername(loginDto.username);

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
    username: user.username,
  };
};

const withdrawal = async (user: User) => {
  if (!user) {
    throw createError(404, { name: 'Not Found Error', message: 'User does not exist' });
  }

  await UserRepository.deleteUser(user.username);

  return {
    message: 'User has been deleted',
  };
};

const getAccessToken = (user: {}) => {
  return jwt.sign(user, process.env.JWT_ACCESS_SECRET || 'asdf', { expiresIn: '1h' });
};

const getRefreshToken = (user: {}) => {
  return jwt.sign(user, process.env.JWT_REFRESH_SECRET || 'fdsa', { expiresIn: '14d' });
};

const refresh = async (refreshToken: string) => {
  try {
    const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'fdsa';
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as { username: string };
    const user = await UserRepository.findUserByUsername(decoded.username);

    if (!user) {
      throw createError(404, { name: 'Not Found Error', message: 'User does not exist' });
    }

    return {
      username: user.username,
      email: user.email,
      nickname: user.nickname,
    };
  } catch (error) {
    throw createError(401, { name: 'Unauthorized Error', message: 'Invalid refresh token' });
  }
};

export const AuthService = {
  register,
  login,
  withdrawal,
  getAccessToken,
  getRefreshToken,
  refresh,
};
