const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../database/models/User');
const config = require('../config');

const options = {
    jwtFromRequest: ExtractJwt.fromHeader('auth'),
    secretOrKey: config.SECRET
}


const jwtLogin = new JwtStrategy(options, async (jwtPayload, done) => {
    try {
        const user = await User.findById(jwtPayload.id);
        done(null, user);
    } catch (e) {
        done(null, false);
    }
})


passport.use(jwtLogin);

module.exports = passport;