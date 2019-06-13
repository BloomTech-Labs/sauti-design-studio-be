const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors(corsOptions));
  server.use(morgan('dev'));
};
