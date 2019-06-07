const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const Users = require("../models/user-models");

// Login with google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], prompt: "select_account" })
);

// google login redirect
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.status(200).redirect(`${process.env.FRONTEND_URL}/users`);
});

module.exports = router;
