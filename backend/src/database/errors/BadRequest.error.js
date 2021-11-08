const { STATUS_CODES } = require('../../constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message || 'Bad request!');
    this.status = STATUS_CODES.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
