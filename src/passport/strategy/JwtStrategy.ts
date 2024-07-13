import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserRepository } from '../../api/user/user.repository';
import { Request } from 'express';

const userRepository = new UserRepository();

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'asdf';

const cookieExtractor = (req: Request) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['accessToken'];
    }
    return token;
}

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
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