const { Unauthorized } = require('http-errors');
const { ACCESS_TOKEN_SECRET } = require('../configs');
const {
  USER_ROLES: { GUEST }
} = require('../constants');
const { verifyToken, logger } = require('../helpers');
const { User } = require('../models');

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  req.user.role = [GUEST];

  if (!authorization) return next(new Unauthorized('Missing headers token'));

  const token = authorization.split(' ')[1];

  try {
    const tokenPayload = verifyToken(token, ACCESS_TOKEN_SECRET);

    const user = await User.findById(tokenPayload._id);
    if (!user) {
      return next(new Unauthorized('Invalid user!'));
    }

    Reflect.deleteProperty(user, 'password');
    Reflect.deleteProperty(user, 'salt');

    req.user = user;
  } catch (error) {
    logger.error(error);
    return next(error);
  }

  return next();
};

module.exports = authenticate;
