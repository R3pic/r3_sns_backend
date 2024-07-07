import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import { AuthService } from "./auth.service";
import { RegisterDto } from "../types/dto/auth.dto";
import createError from 'http-errors';
import { UserRepository } from '../user/user.repository';
import * as bcrypt from 'bcrypt';

jest.mock('../user/user.repository');
jest.mock('bcrypt');

const mockedUserRepository = new UserRepository() as jest.Mocked<UserRepository>;
const authService = new AuthService();

describe('AuthService (검증)', () => {

    beforeEach(() => {
        (authService as any).userRepository = mockedUserRepository;
    });

    describe('register', () => {
        it('register 함수가 존재해야 한다', () => {
            expect(authService.register).toBeDefined();
        });
    
        it('register 동일한 이메일', async () => {
            const registerDto: RegisterDto = {
                email: 'admin@gmail.com',
                userid: '101osc',
                nickname: '101osc',
                password: '1234',
            };
    
            // findUserByEmail이 동일한 이메일을 가진 사용자를 반환하도록 모킹
            mockedUserRepository.findUserByEmail.mockResolvedValue({
                id: 1,
                email: 'admin@gmail.com',
                userid: 'existingUser',
                nickname: 'existingNickname',
                password: 'existingPassword',
                createdAt: new Date(),
            });
    
            await expect(authService.register(registerDto)).rejects.toThrowError(
                createError(409, { name: 'Conflict Error', message: 'User already exists' })
            );
        });
    
        it('register 새로운 이메일', async () => {
            const registerDto: RegisterDto = {
                email: 'newuser@gmail.com',
                userid: 'newuser',
                nickname: 'newuser',
                password: 'password',
            };
    
            // findUserByEmail이 undefined을 반환하도록 모킹 (사용자가 존재하지 않음)
            mockedUserRepository.findUserByEmail.mockResolvedValue(null);
            // createUser가 새로운 사용자를 반환하도록 모킹
            mockedUserRepository.createUser.mockResolvedValue({
                id: 1,
                email: 'newuser@gmail.com',
                userid: 'newuser',
                nickname: 'newuser',
                password: 'password',
                createdAt: new Date(),
            });
    
            const result = await authService.register(registerDto);
    
            expect(result).toEqual({
                email: 'newuser@gmail.com',
                nickname: 'newuser',
                userid: 'newuser',
            });
        });
    });

    describe('login', () => {
        it('login 함수가 존재해야 한다', () => {
            expect(authService.login).toBeDefined();
        });

        it('login 존재하지 않는 사용자', async () => {
            const loginDto = {
                userid: 'nonExistingUser',
                password: 'password',
            };

            mockedUserRepository.findUserByUserId.mockResolvedValue(null);

            await expect(authService.login(loginDto)).rejects.toThrowError(
                createError(404, { name: 'Not Found Error', message: 'User does not exist' })
            );
        });

        it('login 비밀번호 불일치', async () => {
            const loginDto = {
                userid: 'existingUser',
                password: 'incorrectPassword',
            };

            mockedUserRepository.findUserByUserId.mockResolvedValue({
                id: 1,
                email: 'existingUser@email.com',
                userid: 'existingUser',
                nickname: 'existingNickname',
                password: 'correctPassword',
                createdAt: new Date(),
            });

            // bcrypt.compare가 false를 반환하도록 모킹
            jest.spyOn(bcrypt, 'compare').mockImplementation((password, inputpassword) => {
                return password === inputpassword;
            });

            await expect(authService.login(loginDto)).rejects.toThrowError(
                createError(401, { name: 'Unauthorized Error', message: 'Password is incorrect' })
            );
        });

        it('login 성공', async () => {
            const loginDto = {
                userid: 'existingUser',
                password: 'correctPassword',
            };
        
            mockedUserRepository.findUserByUserId.mockResolvedValue({
                id: 1,
                email: 'existingUser@email.com',
                userid: 'existingUser',
                nickname: 'existingNickname',
                password: 'correctPassword',
                createdAt: new Date(),
            });

            // bcrypt.compare가 true를 반환하도록 모킹
            jest.spyOn(bcrypt, 'compare').mockImplementation((password, inputpassword) => {
                return password === inputpassword;
            });
        
            const result = await authService.login(loginDto);
        
            expect(result).toEqual({
                email: 'existingUser@email.com',
                nickname: 'existingNickname',
                userid: 'existingUser',
            });
        });
    });
});
