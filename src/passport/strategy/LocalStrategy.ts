import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../api/user/user.repository';

export const localStrategy = new Strategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  async (userid, password, done) => {
    try {
      const user = await UserRepository.findUserByUsername(userid);
      if (!user) {
        return done(null, false, { message: 'User does not exist' });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return done(null, false, { message: 'Password is incorrect' });
      }

      return done(null, {
        username: user.username,
        email: user.email,
        nickname: user.nickname,
      });
    } catch (error) {
      return done(error);
    }
  },
);
