const express = require("express");
const passportSetup = require("../config/passport-setup");
const passport = require("passport");

const server = express();
const cookieSession = require("cookie-session");
const serverConfig = require("./serverConfig");
const UsersRouter = require("../controllers/users-router");
const AuthRouter = require("../controllers/auth-router");
const keys = require("../config/keys");

//middleware
serverConfig(server);

//routes
server.set("view engine", "ejs");

server.use(
  cookieSession({
    name: "cookie",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
    secure: false,
    // httpOnly: true,
    signed: true
  })
);
// initialize passport
server.use(passport.initialize());
server.use(passport.session());

//  Register and login routes
server.use("/auth", AuthRouter);

// endpoints
server.use("/users", UsersRouter);

server.get("/", (req, res) => {
  res.send(`We're live!`);
});

server.get("/home", (req, res) => {
  res.render("home");
});

server.get("/loggedIn", (req, res) => {
  res.send("You are now signed In!!");
});

module.exports = server;
