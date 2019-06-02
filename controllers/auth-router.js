const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const secrets = require("../config/keys");
const Users = require("../models/User-model");

// Login with google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// google login redirect
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.status(200).redirect("/loggedIn");
});

// register manually
router.post("/register", async (req, res) => {
  let user = req.body;
  if (
    user.companyName === "" ||
    user.companyName === null ||
    user.email === "" ||
    user.email === null ||
    user.password === "" ||
    user.password === null ||
    user.country === "" ||
    user.country === null ||
    user.phoneNum === "" ||
    user.phoneNum === null
  ) {
    res.status(400).json({ message: "Please Fill In All the Fields" });
  } else {
    try {
      const hash = bcrypt.hashSync(user.password, 10);
      user.password = hash;
      await Users.add(user);
      res.status(201).json({ message: "Success" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (
      email === "" ||
      email === null ||
      password === "" ||
      password === null
    ) {
      res
        .status(401)
        .json({ message: "Please make sure login credentials are accurate" });
    } else {
      const user = await Users.findByEmail(email).first();
      const token = generateToken(user);
      res.status(200).json({ message: "Success", token });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

function generateToken(user) {
  const payload = {
    id: user.id,
    name: user.company_name,
    email: user.email
  };
  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
