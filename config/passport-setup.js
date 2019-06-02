const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
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
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      verifyUser(profile, done);
      //   console.log("callback func", profile);
    }
  )
);

async function verifyUser(profile, done) {
  //   console.log(profile);
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
