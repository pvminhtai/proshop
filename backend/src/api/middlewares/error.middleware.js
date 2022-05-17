const { STATUS_CODE } = require('../constants');

const errorMiddleware = (err, req, res, _next) => {
  res
    .status(err.status || STATUS_CODE.INTERNAL_SERVER_ERROR)
    .json({
      statusCode: err.status || STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: err.message ?? 'Internal Server Error!',
      stack: err.stack
    })
    .end();
};

module.exports = errorMiddleware;
