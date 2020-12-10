import passport from 'passport';
import passportJWT from "passport-jwt";
import User from "../models/userModel"

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'ecommerce'
},
  (jwtPayload, done) => User.findById(jwtPayload.sub)
    .then((user: any) => {
      return done(null, user);
    }
    ).catch((err: string) => {
      return done(err);
    })
))
