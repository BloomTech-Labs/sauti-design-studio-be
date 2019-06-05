const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Users = require("../models/user-models");

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
      displayName: user.display_name,
      email: user.email
    };
    done(null, currentUser);
  } else {
    console.log("!!!!!!");
    console.log("no user found", Object.keys(profile), profile._json);
    console.log("!!!!!!");
    const newUser = {
      display_name: profile.name,
      email: profile.email,
      google_id: profile.id
    }
    const user = await Users.add(newUser)
    console.log(user);
    
  }
}
