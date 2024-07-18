import { UserRepository } from '../user/user.repository';
import createError from 'http-errors';
import { UserProfileDto } from '../../types/dto/user.dto';

const getUserbyId = async (userid: string): Promise<UserProfileDto> => {
  const user = await UserRepository.findUserByUsername(userid);
  if (!user) {
    throw createError(404, { name: 'Not Found Error', message: 'User does not exist' });
  }

  return {
    username: user.username,
    nickname: user.nickname,
    introduce: user.introduce,
  };
};

const getUserbyEmail = async (email: string) => {
  const user = await UserRepository.findUserByEmail(email);
  if (!user) {
    throw createError(404, { name: 'Not Found Error', message: 'User does not exist' });
  }

  return {
    nickname: user.nickname,
    username: user.username,
    introduce: user.introduce,
  };
};

export const UserService = {
  getUserbyId,
  getUserbyEmail,
};
