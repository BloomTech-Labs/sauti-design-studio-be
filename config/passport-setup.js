const passport = require("passport");
const GoogleStrategy = require("passport").Strategy;
const keys = require("./keys");
const Users = require("../models/User-Model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  done(null, user.id);
});

passport.use(
  new GoogleStrategy(
    {
      callbackUrl: "auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },
    (profile, done) => {
      verifyUser(profile, done);
    }
  )
);

async function verifyUser(profile, done) {
  const user = await Users.getByEmail(profile.emails[0].value);
  if (user) {
    let newUser = {
      id: user.id,
      companyName: user.company_name,
      email: user.email
    };
    done(null, newUser);
  } else {
    console.log("!!!!!!");
    console.log("no user found");
    console.log("!!!!!!");
  }
}
