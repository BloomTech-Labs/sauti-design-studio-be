require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const corsOptions = {
  origin: [process.env.FRONTEND_URL,"http://localhost:3000"],
  credentials: true,
};

const server = express();
const bodyParser = require('body-parser');
const UsersRouter = require('./controllers/users-router');
const WorkflowsRouter = require('./controllers/workflows-router');
const AuthRouter = require('./controllers/auth-router');
const credentials = require('./config/africas-talking');
const africastalking = require('africastalking')(credentials.AT);
const ProjectRouter = require('./controllers/project-router');
const PublishRouter = require('./controllers/publish-router');
const AdminRouter = require('./controllers/admin-router');
const restricted = require('./controllers/auth/restricted-middleware')

server.use(helmet());
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser());
server.use(cors(corsOptions));
server.use(morgan('dev'));

//  Register and login routes
server.use('/auth', AuthRouter);

// endpoints
// projects endpoint
server.use('/admin', restricted, /*admincheck,*/ AdminRouter);
server.use('/users', restricted, UsersRouter);
server.use('/projects', restricted, ProjectRouter);
server.use('/workflows', WorkflowsRouter);
server.use('/publish', restricted, PublishRouter);

server.get('/', (req, res) => {
  res.send(`We're live! Please Login.`);
});

server.get('/home', (req, res) => {
  res.status(200).json({ message: 'Success' });
});


// ENDPOINT FOR HOMEPAGE
server.get('/', function(req, res) {
  res.sendFile(path.join(`${__dirname}/index.html`));
});

module.exports = server;