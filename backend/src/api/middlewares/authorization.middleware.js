const { Forbidden } = require('http-errors');

const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (req.user && allowedRoles.includes(req.user.role)) {
      next();
    } else {
      next(new Forbidden('Access denied!'));
    }
  };
};

module.exports = verifyRoles;
