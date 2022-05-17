const { Unauthorized } = require('http-errors');
const { verify } = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('../../config');
const { logger } = require('../helpers');
const { User } = require('../models');

const authenticate = async (req, res, next) => {
  const token = req.cookies.Authorization || req.headers.authorization?.split(' ')[1] || null;

  if (token) {
    try {
      const tokenPayload = verify(token, ACCESS_TOKEN_SECRET);

      const user = await User.findById(tokenPayload._id).select('-password').exec();

      if (!user) {
        return next(new Unauthorized('Invalid user!'));
      }

      req.user = user;
    } catch (error) {
      logger.error(error);
      return next(error);
    }
  }

  return next();
};

module.exports = authenticate;
