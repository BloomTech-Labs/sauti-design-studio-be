const express = require("express");

const server = express();
const serverConfig = require("./serverConfig");
const UsersRouter = require("../controllers/users-router");
//middleware
serverConfig(server);

//routes
server.use("/users", UsersRouter);
// endpoints

server.get("/", (req, res) => {
  res.send("We are live ");
});

module.exports = server;
