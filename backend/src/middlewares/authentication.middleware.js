const { Unauthorized, Forbidden } = require('http-errors');
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('../configs');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return next(Unauthorized('Missing headers token'));

  const token = authHeader.split(' ')[1];

  jwt.verify(token, ACCESS_TOKEN_SECRET, (error, payload) => {
    if (error) throw Forbidden('Invalid token!');
    req.user = payload;
  });

  return next();
};

module.exports = authenticate;
