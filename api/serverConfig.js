const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');


const corsOptions = {
  origin: 'http://localhost:8000',
  credentials: true,
}

module.exports = server => {
  server.use(cors(corsOptions));
  server.use(helmet());
  server.use(express.json());
  server.use(morgan('dev'));
};
