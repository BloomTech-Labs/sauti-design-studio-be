const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Users = require("../models/user-models");
const axios = require('axios')
const okta = require('@okta/okta-sdk-nodejs');

const oktaClient = new okta.Client({
  orgUrl: process.env.OIDC_OKTA_DOMAIN,
  token: process.env.OKTA_REGISTER_TOKEN
});

// receives information from frontend to create a new okta user
router.post('/okta/register', (req, res) => {
  const newUser = {
    profile: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      login: req.body.email
    },
    credentials: {
      password: {
        value: req.body.password
      }
    }
  };
  console.log("this is the user info from front end: ", newUser)
  oktaClient
    .createUser(newUser)
    .then(user => {
      res.status(201);
      res.send(user);
    })
    .catch(({error, code, message, stack}) => {
      res.status(400);
      console.log(error, code, message, stack)
      res.send("error");
    });
})

// receive user info from frontend after they login with okta
router.post('/okta/verify', createOktaSession, verifySession, getOrAddUser, (req, res) => {
    const token = generateToken(req.user)
    res.status(200).json({
      token: token,
      id: req.user.id
    })
  }
);

// function that takes sessionToken from frontend and creates an okta session using that token
function createOktaSession(req,res,next){
  axios.post(`${process.env.OIDC_OKTA_DOMAIN}/api/v1/sessions`, {sessionToken: req.body.sessionToken})
  .then(res=>{
    console.log("session data: ", res.data)
    req.sessionData = res.data
    next()
  })
  .catch(err => {
    console.log(err)
  })
}

// function that verifies the session's information with request information from frontend
function verifySession(req,res,next){
  if(req.body.id === req.sessionData.userId && req.body.profile.login === req.sessionData.login && req.sessionData.status === 'ACTIVE'){
    console.log("user information from frontend and okta-created-session match")
    next()
  } else {
    console.log("user information from frontend and okta-created-session DONT match")
    res.status(403).json({message: "User information does not match."})
  }
}

// function to check if user exists, if it doesnt, create the user in database
async function getOrAddUser(req,res,next){

  if (req.body){
    const user = await Users.getByEmail(req.body.profile.login).catch(err =>
      console.error(err)
    );
  
    try {
      if (!user) {
        const [id] = await Users.add({
          display_name: `${req.body.profile.firstName} ${req.body.profile.lastName}`,
          email: req.body.profile.login,
          okta_id: req.body.id,
        });
        req.user = await Users.getById(id)
      } else {
        req.user = user;
      }
      next();
    } catch (err) {
      console.error(err);
    }

  } else {
      res.status(400).json({ message: 'No user info.' });
    }
  }

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