const { STATUS_CODES } = require('../constants');

const errorHandling = (err, req, res, _next) => {
  res.status(err.status ?? STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    message: err.message ?? 'Internal Server Error!',
    ...err
  });
};

module.exports = errorHandling;
