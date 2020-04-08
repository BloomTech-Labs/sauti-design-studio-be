require('dotenv').config();
const path = require('path');
const express = require('express');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const corsOptions = {
  origin: [process.env.FRONTEND_URL,"http://localhost:3000"],
  credentials: true,
};

const server = express();
const session = require('express-session');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passportSetup = require('./config/passport-setup');
const UsersRouter = require('./controllers/users-router');
const WorkflowsRouter = require('./controllers/workflows-router');
const AuthRouter = require('./controllers/auth-router');
const credentials = require('./config/africas-talking');
const africastalking = require('africastalking')(credentials.AT);
const ProjectRouter = require('./controllers/project-router');
const PublishRouter = require('./controllers/publish-router');
const AdminRouter = require('./controllers/admin-router');
const restricted = require('./controllers/auth/restricted-middleware')

// middleware
server.use(
  cookieSession({
    name: 'cookie',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_COOKIE],
    secure: false,
    // httpOnly: true,
    signed: true,
  })
);

// express-session cookie
// server.use(express.static(path.join(__dirname, 'public')))

server.use(session({
  secret: process.env.SESSION_COOKIE,
  resave: false,
  saveUninitialized: true
}));


server.use(helmet());
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser());
server.use(cors(corsOptions));
server.use(morgan('dev'));

// initialize passport
server.use(passport.initialize());
server.use(passport.session());

//  Register and login routes
server.use('/auth', AuthRouter);

// endpoints
// projects endpoint
server.use('/admin', restricted, /*admincheck,*/ AdminRouter);
server.use('/users', restricted, /*authCheck,ensureLoggedIn,*/  UsersRouter);
server.use('/projects', restricted, ProjectRouter);
server.use('/workflows', restricted, WorkflowsRouter);
server.use('/publish', restricted, PublishRouter);






server.get('/', (req, res) => {
  res.send(`We're live! Please Login.`);
});

server.get('/home', (req, res) => {
  res.status(200).json({ message: 'Success' });
});

// Logout route
server.get('/logout', (req, res) => {
  req.logOut();
  req.logout(); // added for okta logout
  req.session.destroy(); // added for okta logout
  res.status(400).redirect(`${process.env.FRONTEND_URL}`);
});

// ENDPOINT FOR HOMEPAGE
server.get('/', function(req, res) {
  res.sendFile(path.join(`${__dirname}/index.html`));
});

module.exports = server;


// okta middleware ensure logged in
//do i make sure user id(s)match
function ensureLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect(`${process.env.FRONTEND_URL}`)
}