const express = require('express');
const router = require('../api');
const authentication = require('./authentication.middleware');
const cors = require('./cors.middleware');
const errorHandler = require('./errorHandler.middleware');

module.exports = [
  express.json(),
  express.urlencoded({ extended: true }),
  cors,
  authentication,
  router,
  errorHandler
];
