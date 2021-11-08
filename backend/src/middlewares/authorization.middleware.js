const { Context } = require('../helpers');

const permit = (...allowedRoles) => {
  return (req, res, next) => {
    const ctx = new Context(req, res);

    if (!allowedRoles) next();

    if (ctx.req.user.role.some(role => allowedRoles.includes(role))) {
      next();
    } else {
      ctx.sendForbidenError('Forbidden!');
    }
  };
};

module.exports = permit;
