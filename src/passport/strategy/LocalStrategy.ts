import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../api/user/user.repository';

const userRepository = new UserRepository();

export const localStrategy = new Strategy({
    usernameField: 'userid',
    passwordField: 'password',
}, async (userid, password, done) => {
    try {
        const user = await userRepository.findUserByUserId(userid);
        if (!user) {
            return done(null, false, { message: 'User does not exist' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return done(null, false, { message: 'Password is incorrect' });
        }

        return done(null, {
            userid: user.userid,
            email: user.email,
            nickname: user.nickname,
        });
    } catch (error) {
        return done(error);
    }
});