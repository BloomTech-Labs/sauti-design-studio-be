const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const OktaStrategy = require('passport-okta-oauth').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const Users = require('../models/user-models');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


// Need to set up facebook account
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//       callbackURL: process.env.REDIRECT_URL,
//       profileFields: ['id', 'displayName', 'photos', 'email'],
//     },
//     (accessToken, refreshToken, profile, done) => {
//       verifyFacebookUser(profile, done);
//     }
//   )
// );
// passport.use(new OktaStrategy({
//   audience: process.env.OKTA_AUDIENCE,   
//     // audience is the Okta Domain, 
//     // e.g. https://example.okta.com, https://example.oktapreview.com

//   clientID: process.env.OKTA_CLIENTID,
//     // clientID is the public Okta Application Client Credentials, 
//     // its a 20 character alphanumeric string
//     // e.g. U7VYvsaiuqlDOHjIVTIA  (generated example)

//   clientSecret: process.env.OKTA_CLIENTSECRET,
//     // clientSecret is the private Okta Application Client Credentials, 
//     // its a 40 character alphanumeric string with a hypen(s).
//     // e.g. Vwb-R4fQnSH7uJkokDhPI-WR4qEiuWFokYANM5C  (generated example)

//   idp: process.env.OKTA_IDP,
//     // idp is the Identity Provider (id). This is an optional field
//     // its a 20 character alphanumeric string
//     // e.g. qOp8aaJmCEhvep5Il6ZJ  (generated example)

//   scope: ['openid', 'email', 'profile'],
//   response_type: 'code',
//   callbackURL: baseURL + "/auth/okta/callback"
//     // callbackURL is the redirect URL Okta should return the user to
//     // This is a URL on your server

// }, function(accessToken, refreshToken, profile, done) {
//   // Example Callback to Handle the Profile Object
//     verifyOktaUser({profile, token: accessToken}, done)
//   return profile
// }));

passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/auth/google/redirect',
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      verifyGoogleUser({ profile, token: accessToken }, done);
    }
  )
);

const verifyGoogleUser = async (obj, done) => {
  const { profile, token } = obj;
  const user = await Users.getByEmail(profile.emails[0].value).catch(err =>
    console.error(err)
  );


  try {
    if (!user) {
      const [id] = await Users.add({
        display_name: profile.displayName,
        email: profile.emails[0].value,
        google_id: profile.id,
        pic: profile._json.picture,
      });
      done(null, await Users.getById(id), token);
    } else {
      done(null, user, token);
    }
  } catch (err) {
    console.error(err);
  }
};

const verifyFacebookUser = async (profile, done) => {
  const facebookUser = await Users.getByEmail(profile.emails[0].value);

  console.log(profile);

  try {
    if (!facebookUser) {
      const newFacebookUser = await Users.add({
        display_name: profile.displayName,
        email: profile.emails[0].value,
        facebook_id: profile.id,
        pic: profile._pic,
      });

      done(null, newFacebookUser);
    } else {
      done(null, facebookUser);
    }
  } catch (err) {
    console.error(err);
  }
};

const verifyOktaUser = async (obj, done) => {
  const { profile, token } = obj;
  const user = await Users.getByEmail(profile.emails[0].value).catch(err =>
    console.error(err)
  );


  try {
    if (!user) {
      const [id] = await Users.add({
        display_name: profile.displayName,
        email: profile.emails[0].value,
        google_id: profile.id,
        pic: profile._json.picture,
      });
      done(null, await Users.getById(id), token);
    } else {
      done(null, user, token);
    }
  } catch (err) {
    console.error(err);
  }
};