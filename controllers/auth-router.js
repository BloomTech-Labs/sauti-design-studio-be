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
    const token = generateToken(req.user);
    console.log("google req.user", req.user);
    // in response, set the generated token to some cookie called 'my token'
    res
      .status(200)
      .cookie("sauti_token", token)
      .cookie("google token", res.req.authInfo)
      .cookie("user_id", req.user.id)
      .redirect(`${process.env.FRONTEND_URL}/profile/${req.user.id}`);
  }
);

// okta login redirect
router.get('/okta/redirect',
  passport.authenticate('oidc', { failureRedirect: '/' }),
  // generate token
  (req, res) => {
    const token = generateToken(req.user)
    console.log("okta req.user", req.user);
    res
      .status(200)
      .cookie("sauti_token", token)
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


// function generates a token
function generateToken(user){
  const payload = {
      subject: user.email,
      id: user.id,
      user_type: user.user_type
  }

  options = {
      expiresIn: '1h'
  }

  return jwt.sign(payload, process.env.JWT_SECRET, options)
}