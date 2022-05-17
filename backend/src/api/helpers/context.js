const { ALLOWED_REQUEST_PROPS, STATUS_CODE } = require('../constants');

class Context {
  /**
   * Create context
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.payload = {};
  }

  get pagination() {
    const { page, size } = this.req.query;
    const limit = +size;
    const offset = (+page - 1) * limit;
    return { limit, offset };
  }

  get sorter() {
    // const { sortBy, order } = this.req.query;
    return {};
  }

  get params() {
    return this.req.params;
  }

  get queryParams() {
    return this.req.query;
  }

  get body() {
    return this.req.body;
  }

  get user() {
    return this.req.user;
  }

  getRequest(prop) {
    const { PARAMS, QUERY, BODY, PAGINATION, SORTER } = ALLOWED_REQUEST_PROPS;
    switch (prop) {
      case PARAMS:
        return this.params;
      case QUERY:
        return this.queryParams;
      case BODY:
        return this.body;
      case PAGINATION:
        return this.pagination;
      case SORTER:
        return this.sorter;
      default:
        return {};
    }
  }

  /**
   * Send response to client
   * @param {number} statusCode - Http code
   * @param {Object} payload - Response data object
   */
  sendResponse(statusCode, payload) {
    if (payload) this.payload = payload;
    this.res.status(statusCode).json(this.payload);
  }

  sendSuccessResponse(payload) {
    if (payload) this.payload = payload;
    this.res.status(STATUS_CODE.SUCCESS).json(this.payload);
  }

  sendCreatedResponse(payload) {
    if (payload) this.payload = payload;
    this.res.status(STATUS_CODE.CREATED).json(this.payload);
  }

  sendError(error) {
    this.res
      .status(error.status || STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({
        statusCode: error.status,
        message: error.message,
        stack: error.stack
      })
      .end();
  }
}

module.exports = Context;
