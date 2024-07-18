import { describe, it, expect, jest } from '@jest/globals';
import { AuthService } from './auth.service';
import { RegisterDto } from '../../types/dto/auth.dto';
import createError from 'http-errors';
import { UserRepository } from '../user/user.repository';
import * as bcrypt from 'bcrypt';

jest.mock('../user/user.repository');
jest.mock('bcrypt');

describe('AuthService (검증)', () => {
  describe('register', () => {
    it('register 함수가 존재해야 한다', () => {
      expect(AuthService.register).toBeDefined();
    });

    it('register시 동일한 이메일 존재할 경우', async () => {
      const registerDto: RegisterDto = {
        email: 'test@gmail.com',
        username: '101osc',
        nickname: '101osc',
        password: '1234',
        introduce: '',
      };

      jest.spyOn(UserRepository, 'findUserByEmail').mockResolvedValue({
        id: 1,
        email: 'test@gmail.com',
        username: '101osc',
        nickname: '101osc',
        password: '1234',
        introduce: '',
        createdAt: new Date(),
      });

      await expect(AuthService.register(registerDto)).rejects.toThrowError(
        createError(409, { name: 'Conflict Error', message: 'User already exists' }),
      );
    });

    it('register시 가입 성공', async () => {
      const registerDto: RegisterDto = {
        email: 'newuser@gmail.com',
        username: 'newuser',
        nickname: 'newuser',
        password: 'password',
        introduce: '',
      };

      jest.spyOn(UserRepository, 'findUserByEmail').mockResolvedValue(null);

      jest.spyOn(UserRepository, 'createUser').mockResolvedValue({
        id: 2,
        email: 'newuser@gmail.com',
        username: 'newuser',
        nickname: 'newuser',
        password: 'password',
        introduce: '',
        createdAt: new Date(),
      });

      const result = await AuthService.register(registerDto);

      expect(result).toEqual({
        email: 'newuser@gmail.com',
        nickname: 'newuser',
        username: 'newuser',
      });
    });
  });

  describe('login', () => {
    it('login 함수가 존재해야 한다', () => {
      expect(AuthService.login).toBeDefined();
    });

    it('login 존재하지 않는 사용자', async () => {
      const loginDto = {
        username: 'nonExistingUser',
        password: 'password',
      };

      jest.spyOn(UserRepository, 'findUserByUsername').mockResolvedValue(null);

      await expect(AuthService.login(loginDto)).rejects.toThrowError(
        createError(404, { name: 'Not Found Error', message: 'User does not exist' }),
      );
    });

    it('login 비밀번호 불일치', async () => {
      const loginDto = {
        username: 'existingUser',
        password: 'incorrectPassword',
      };

      jest.spyOn(UserRepository, 'findUserByUsername').mockResolvedValue({
        id: 1,
        email: 'existingUser@email.com',
        username: 'existingUser',
        nickname: 'existingNickname',
        password: 'correctPassword',
        introduce: '',
        createdAt: new Date(),
      });

      jest.spyOn(bcrypt, 'compare').mockImplementation((password, inputpassword) => {
        return password === inputpassword;
      });

      await expect(AuthService.login(loginDto)).rejects.toThrowError(
        createError(401, { name: 'Unauthorized Error', message: 'Password is incorrect' }),
      );
    });

    it('login 성공', async () => {
      const loginDto = {
        username: 'existingUser',
        password: 'correctPassword',
      };

      jest.spyOn(UserRepository, 'findUserByUsername').mockResolvedValue({
        id: 1,
        email: 'existingUser@email.com',
        username: 'existingUser',
        nickname: 'existingNickname',
        password: 'correctPassword',
        introduce: '',
        createdAt: new Date(),
      });

      // bcrypt.compare가 true를 반환하도록 모킹
      jest.spyOn(bcrypt, 'compare').mockImplementation((password, inputpassword) => {
        return password === inputpassword;
      });

      const result = await AuthService.login(loginDto);

      expect(result).toEqual({
        email: 'existingUser@email.com',
        nickname: 'existingNickname',
        username: 'existingUser',
      });
    });
  });
});
