const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Users = require("../models/user-models");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    (accessToken, refreshToken, profile, done) => {
      verifyUser(profile, done);
    }
  )
);



const verifyUser = async (profile, done) => {
  const user = await Users.getByEmail(profile.emails[0].value);
  if (!user) {
    const newUser = await Users.add({
      display_name: profile.name,
      email: profile.emails[0].value,
      google_id: profile.id
    })
    done(null, newUser)
  } else {
    done(null, user)
  }
}

