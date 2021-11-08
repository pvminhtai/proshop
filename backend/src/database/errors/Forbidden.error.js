const { STATUS_CODES } = require('../../constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message || 'Forbidden!');
    this.status = STATUS_CODES.FORBIDDEN;
  }
}

module.exports = ForbiddenError;
