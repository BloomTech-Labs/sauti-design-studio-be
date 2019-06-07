const express = require("express");
const passportSetup = require("../config/passport-setup");
const passport = require("passport");

const server = express();
const cookieSession = require("cookie-session");
const serverConfig = require("./serverConfig");
//ROUTES
const UsersRouter = require("../controllers/users-router");
const WorkflowsRouter = require('../controllers/workflows-router')
const UsersWorkflows = require('../controllers/userworkflows-router')
const ClientsRouter = require('../controllers/clients-router')
const AnswersRouter = require('../controllers/answers-router')
const QuestionsRouter = require('../controllers/questions-router')
//Authentication
const AuthRouter = require("../controllers/auth-router");
const authCheck = require("../controllers/authCheck");
const ProfileRouter = require("../controllers/profile-router");

//middleware
serverConfig(server);

console.log(process.env.NODE_ENV);

server.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  next();
});



server.use(
  cookieSession({
    name: "cookie",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_COOKIE],
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
server.use('/profile', authCheck, ProfileRouter)
server.use("/users", authCheck, UsersRouter);
server.use("/users-workflows", UsersWorkflows)
server.use("/workflows", WorkflowsRouter)
server.use("/clients", ClientsRouter)
server.use("/answers",AnswersRouter)
server.use('/questions', QuestionsRouter)
server.get("/", (req, res) => {
  res.send(`We're live! Please Login.`);
});

server.get("/home", (req, res) => {
  res.status(200).json({ message: "Success" });
});

// Logout route
server.get("/logout", (req, res) => {
  req.logOut();
  res.status(400).redirect(`${process.env.FRONTEND_URL}`);
});

module.exports = server;
