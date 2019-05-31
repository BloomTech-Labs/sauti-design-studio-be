const router = require("express").Router();
const tokens = require("../auth/token");
const db = require("../data/dbConfig");
const secret = require('../api/secret');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const Users = require("../models/User-Model")

router.post("/users/register", (req, res) => {
  const user = req.body;

  if (!user.companyName || !user.country || !user.email || !user.phoneNum || !password) {
    res.status(400).json({
      error: "Please fill out all of the fields"
    });
  } else {
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;
    console.log("hi");
    db("users")
      .insert(user, 'id')
      .then(ids => {
        console.log("******", ids);
        const id = ids[0];

        db("users")
          .where({ id })
          .first()
          .then(user => {
            const token = tokens.generateToken(user);
            res
              .status(201)
              .json({ id: user.id, username: user.email, token });
          })
          .catch(error => {
            res.status(500).json({
              error: "There was an error while saving the user to the database."
            });
          });
      })
      .catch(error => {
        res.status(400).json({
          error: "This username already exists!"
        });
      });
  }
});

router.post("/users/login", (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      error: "Please provide a email and password."
    });
  } else {
    db("users")
      .where({ email })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = tokens.generateToken(user);
          res
            .status(200)
            .json({ message: `${user.email} is logged in.`, token });
        } else {
          res.status(401).json({
            error: "Please provide the correct username and password."
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while logging in."
        });
      });
  }
});

module.exports = router;