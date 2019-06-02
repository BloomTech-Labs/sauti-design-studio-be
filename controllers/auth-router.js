const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwtSecrets = require("../config/keys");
const Users = require("../models/User-model");

// Login with google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// google login redirect
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.status(200).redirect("/home");
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

      const newUser = await Users.add(user);
      const token = await generateToken(newUser);
      res.status(201).json({ message: "Success", token });
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
      !email ||
      password === "" ||
      password === null ||
      !password
    ) {
      res
        .status(401)
        .json({ message: "Please make sure login credentials are accurate" });
    } else {
      const newUser = await Users.getByEmail(email);
      const token = generateToken(newUser);
      res.status(200).json({ message: "Success", token });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

function generateToken(user) {
  const payload = {
    id: user.id,
    companyName: user.company_name,
    email: user.email
  };
  const options = {
    expiresIn: "3h"
  };
  return jwt.sign(payload, jwtSecrets.jwt.jwtSecret, options);
}

module.exports = router;
