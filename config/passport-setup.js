const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");
const Users = require("../models/User-Model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await Users.getById(id);
  if (user) {
    done(null, user);
  } else {
    done("No user found");
  }
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

async function verifyUser(profile, done) {
  const user = await Users.getByEmail(profile.emails[0].value);
  if (user) {
    let currentUser = {
      id: user.id,
      companyName: user.company_name,
      email: user.email
    };
    done(null, currentUser);
  } else {
    console.log("!!!!!!");
    console.log("no user found");
    console.log("!!!!!!");
  }
}
