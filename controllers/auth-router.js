const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const Users = require("../models/user-models");

// Login with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account"
  })
);

// Login with okta
router.get("/okta", passport.authenticate('oidc'));

// google login redirect
router.get(
  "/google/redirect",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    console.log("req", req.user);
    res
      .status(200)
      .cookie("token", res.req.authInfo)
      .cookie("user_id", req.user.id)
      .redirect(`${process.env.FRONTEND_URL}/profile/${req.user.id}`);
  }
);

// okta login redirect
router.get('/okta/redirect',
  passport.authenticate('oidc', { failureRedirect: '/' }),
  (req, res) => {
    console.log("req", req.user);
    console.log("this is the cookie: ", res.headers.cookie)
    res
      .status(200)
      .cookie("okta_token", res.req.authInfo)
      .cookie("user_id", req.user.id)
      .redirect(`${process.env.FRONTEND_URL}/profile/${req.user.id}`);
  }
);

// Login with facebook
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    authType: "reauthenticate",
    scope: ["public_profile", "email"]
  })
);

// facebook login redirect
router.get(
  "/facebook/redirect",
  passport.authenticate("facebook"),
  (req, res) => {
    res.status(200).redirect(`${process.env.FRONTEND_URL}/workflows`);
  }
);

module.exports = router;
