const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    stack: err.stack
  });
};

module.exports = errorHandler;
