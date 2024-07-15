import passport from 'passport';

import { localStrategy } from './strategy/LocalStrategy';
import { jwtStrategy } from './strategy/JwtStrategy';

passport.use(localStrategy);
passport.use(jwtStrategy);

passport.serializeUser((user, done) => {
  done(null, user);
});
