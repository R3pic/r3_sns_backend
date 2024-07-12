import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserRepository } from '../../api/user/user.repository';

const userRepository = new UserRepository();

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'asdf';

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: ACCESS_SECRET,
};

export const jwtStrategy = new Strategy(jwtOptions, async (jwtPayload, done) => {
    try {
        const user = await userRepository.findUserByUsername(jwtPayload.username);
        if (!user) {
            return done(null, false, { message: 'User does not exist' });
        }

        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
});