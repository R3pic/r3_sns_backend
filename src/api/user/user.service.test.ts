import { describe, it, expect, jest } from "@jest/globals";
import { UserService } from "./user.service";
import createError from 'http-errors';
import { UserRepository } from '../user/user.repository';

const userService = new UserService();

describe('UserService (검증)', () => {
    describe('getUserbyId', () => {
        it('getUserbyId 함수가 존재해야 한다', () => {
            expect(userService.getUserbyId).toBeDefined();
        });

        it('getUserbyId 존재하지 않는 사용자', async () => {
            const userid = 'existingUser';

            jest.spyOn(UserRepository.prototype, 'findUserByUserId').mockResolvedValue(null);

            await expect(userService.getUserbyId(userid)).rejects.toThrowError(
                createError(404, { name: 'Not Found Error', message: 'User does not exist' })
            );
        });

        it('getUserbyId 존재하는 사용자', async () => {
            const userid = 'existingUser';

            jest.spyOn(UserRepository.prototype, 'findUserByUserId').mockResolvedValue({
                id: 1,
                email: 'test@gmail.com',
                userid: 'existingUser',
                nickname: 'existingNickname',
                password: 'existingPassword',
                createdAt: new Date(),
            });

            const result = await userService.getUserbyId(userid);

            expect(result).toEqual({
                nickname: 'existingNickname',
                userid: 'existingUser',
            });
        });
    });
});