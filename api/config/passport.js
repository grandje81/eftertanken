const jwtStrategy = require('passport-jwt').Strategy;
const jwtExtract = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Account = mongoose.model('accounts');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = jwtExtract.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(
        new jwtStrategy(opts, (jwt_payload, done) => {
            Account.findById(jwt_payload.id)
            .then(Account => {
                if(Account) {
                    return done(null, Account);
                }
                return done(null, false);
            })
            .catch(err => console.log(err));
        })
    );
};