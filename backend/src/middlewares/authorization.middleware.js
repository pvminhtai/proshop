const { Forbidden } = require('http-errors');
const { Context } = require('../helpers');

const permit = (...allowedRoles) => {
  return (req, res, next) => {
    const ctx = new Context(req, res);

    if (allowedRoles) next();

    if ([...allowedRoles].includes(ctx.req.user.role)) {
      next();
    } else {
      ctx.sendError(new Forbidden());
    }
  };
};

module.exports = permit;
