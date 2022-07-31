const passport = require('passport');
const User = require('../models/User');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const GOOGLE_CALLBACK_URL =
  'http://localhost:8080/api/v1/users/google/callback';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    function (req, res, accessToken, refreshToken, profile, cb) {
      // Admin.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
      User.findOne(
        {
          googleId: profile.id,
        },
        function (err, user) {
          if (err) {
            return cb(err);
          }
          //No user was found... so create a new user with values from Facebook (all the profile. stuff)
          if (!user) {
            user = new User({
              phoneNumber: '',
              gender: '',
              dateOfBirth: '',
              fullName: profile.displayName,
              email: profile.emails[0].value,
              avatar: profile.photos[0].value,
              googleId: profile.id,
            });
            user.save(function (err) {
              if (err) console.log(err);
              return cb(err, user);
            });
          } else {
            //found user. Return
            return cb(null, user);
          }
        }
      );
    }
  )
);

passport.serializeUser((user, cb) => {
  console.log('Serializing user:', user);
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  // cb(null, user);
  User.findById(id, function (err, user) {
    cb(err, user);
  });
});
