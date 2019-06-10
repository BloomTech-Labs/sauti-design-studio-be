const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const Users = require('../models/user-models');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: '/auth/facebook/redirect',
      profileFields: ['id', 'displayName', 'photos', 'email'],
    },
    (accessToken, refreshToken, profile, done) => {
      verifyFacebookUser(profile, done);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/auth/google/redirect',
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      verifyUser(profile, done);
    }
  )
);

const verifyUser = async (profile, done) => {
  const user = await Users.getByEmail(profile.emails[0].value);
  try {
    if (!user) {
      const newUser = await Users.add({
        display_name: profile.displayName,
        email: profile.emails[0].value,
        google_id: profile.id,
      });
      done(null, newUser);
    } else {
      done(null, user);
    }
  } catch (e) {
    console.log(e);
  }
};

const verifyFacebookUser = async (profile, done) => {
  console.log(profile);

  const fbookUser = await Users.getByEmail(profile.emails[0].value);
  try {
    if (!fbookUser) {
      const newFbookUser = await Users.add({
        display_name: profile.displayName,
        email: profile.emails[0].value,
        facebook_id: profile.id,
      });
      done(null, newFbookUser);
    } else {
      done(null, fbookUser);
    }
  } catch (e) {
    console.log(e);
  }
};
