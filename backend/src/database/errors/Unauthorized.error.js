const { STATUS_CODES } = require('../../constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message || 'Unauthorized');
    this.status = STATUS_CODES.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
