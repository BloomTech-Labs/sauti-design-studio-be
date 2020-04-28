// const passport = require('passport');
// const OidcStrategy = require('passport-openidconnect').Strategy;
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// // const OktaStrategy = require('passport-okta-oauth').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// const Users = require('../models/user-models');

// const callback = process.env.BACKEND_URL ? process.env.BACKEND_URL : "http://localhost:5000"


// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });

// passport.use('oidc', new OidcStrategy({
//   issuer: `${process.env.OIDC_OKTA_DOMAIN}/oauth2/default`,
//   authorizationURL: `${process.env.OIDC_OKTA_DOMAIN}/oauth2/default/v1/authorize`,
//   tokenURL: `${process.env.OIDC_OKTA_DOMAIN}/oauth2/default/v1/token`,
//   userInfoURL: `${process.env.OIDC_OKTA_DOMAIN}/oauth2/default/v1/userinfo`,
//   clientID: `${process.env.OKTA_CLIENT_ID}`,
//   clientSecret: `${process.env.OKTA_CLIENT_SECRET}`,
//   callbackURL: `${callback}/auth/okta/redirect`,
//   scope: `openid profile`
// }, (issuer, sub, profile, accessToken, refreshToken, done) => {
//   // return done(null, profile);
//   verifyOktaUser({ profile, token: accessToken }, done)
// }));

// const verifyOktaUser = async (obj, done) => {
//   const { profile, token } = obj;
//   console.log(profile)
//   const user = await Users.getByEmail(profile._json.preferred_username).catch(err =>
//     console.error(err)
//   );


//   try {
//     if (!user) {
//       const [id] = await Users.add({
//         display_name: profile.displayName,
//         email: profile._json.preferred_username,
//         okta_id: profile.id,
//       });
//       done(null, await Users.getById(id), token);
//     } else {
//       done(null, user, token);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };


// passport.use(
//   new GoogleStrategy(
//     {
//       callbackURL: '/auth/google/redirect',
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     },
//     (accessToken, refreshToken, profile, done) => {
//       verifyGoogleUser({ profile, token: accessToken }, done);
//     }
//   )
// );

// const verifyGoogleUser = async (obj, done) => {
//   const { profile, token } = obj;
//   console.log(profile)
//   const user = await Users.getByEmail(profile.emails[0].value).catch(err =>
//     console.error(err)
//   );


//   try {
//     if (!user) {
//       const [id] = await Users.add({
//         display_name: profile.displayName,
//         email: profile.emails[0].value,
//         google_id: profile.id,
//         pic: profile._json.picture,
//       });
//       done(null, await Users.getById(id), token);
//     } else {
//       done(null, user, token);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

// const verifyFacebookUser = async (profile, done) => {
//   const facebookUser = await Users.getByEmail(profile.emails[0].value);

//   console.log(profile);

//   try {
//     if (!facebookUser) {
//       const newFacebookUser = await Users.add({
//         display_name: profile.displayName,
//         email: profile.emails[0].value,
//         facebook_id: profile.id,
//         pic: profile._pic,
//       });

//       done(null, newFacebookUser);
//     } else {
//       done(null, facebookUser);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };


