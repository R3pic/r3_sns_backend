import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import { AuthService } from "./auth.service";
import { RegisterDto } from "../types/dto/auth.dto";
import createError from 'http-errors';
import { UserRepository } from '../user/user.repository';

jest.mock('../user/user.repository');

type MockedUserRepository = jest.Mocked<UserRepository>;

describe('AuthService (검증)', () => {
    let authService: AuthService;
    let mockedUserRepository: MockedUserRepository;

    beforeEach(() => {
        mockedUserRepository = new UserRepository() as MockedUserRepository;
        authService = new AuthService();
        (authService as any).userRepository = mockedUserRepository;
        jest.clearAllMocks();
    });

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
