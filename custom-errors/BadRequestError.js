const { HTTP_STATUS_BAD_REQUEST } = require('../utils/constants');

module.exports = class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = HTTP_STATUS_BAD_REQUEST; // 400
  }
};
