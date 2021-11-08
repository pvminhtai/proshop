const { STATUS_CODES } = require('../../constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message || 'Not found');
    this.status = STATUS_CODES.NOT_FOUND;
  }
}

module.exports = NotFoundError;
