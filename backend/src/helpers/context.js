const { ALLOWED_REQUEST_PROPS, STATUS_CODES } = require('../constants');

class Context {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.payload = {
      message: '',
      data: null,
      metadata: null
    };
  }

  getPaginationQuery() {
    const { page, size } = this.req.query;
    const limit = +size;
    const offset = (+page - 1) * limit;
    return { limit, offset };
  }

  getSortQuery() {
    // const { sortBy, order } = this.req.query;
    return {};
  }

  getRequestParams(name) {
    return name ? this.req.params[name] : this.req.params;
  }

  getRequestQuery(name) {
    const { page, size, sortBy, order, ...queryProps } = this.req.query;
    return name ? queryProps[name] : this.req.query;
  }

  getRequestBody(name) {
    return name ? this.req.body[name] : this.req.body;
  }

  getRequest(type) {
    switch (type) {
      case ALLOWED_REQUEST_PROPS.PARAMS:
        return this.getRequestParams();
      case ALLOWED_REQUEST_PROPS.QUERY:
        return this.getRequestQuery();
      case ALLOWED_REQUEST_PROPS.BODY:
        return this.getRequestBody();
      case ALLOWED_REQUEST_PROPS.PAGINATION:
        return this.getPaginationQuery();
      case ALLOWED_REQUEST_PROPS.SORTER:
        return this.getSortQuery();
      default:
        return {};
    }
  }

  send(message, data, metadata) {
    this.payload.message = message ?? '';
    this.payload.data = data;
    this.payload.metadata = metadata;
    this.res.json(this.payload);
  }

  sendError(error, ...args) {
    this.res.status(error.status ?? STATUS_CODES.INTERNAL_SERVER_ERROR);
    this.send(error.message, ...args);
  }

  sendSuccessResponse(...args) {
    this.res.status(STATUS_CODES.SUCCESS);
    this.send(...args);
  }

  sendCreatedResponse(...args) {
    this.res.status(STATUS_CODES.CREATED);
    this.send(...args);
  }

  sendBadRequestError(...args) {
    this.res.status(STATUS_CODES.BAD_REQUEST);
    this.send(...args);
  }

  sendUnauthorizedError(...args) {
    this.res.status(STATUS_CODES.UNAUTHORIZED);
    this.send(...args);
  }

  sendForbidenError(...args) {
    this.res.status(STATUS_CODES.FORBIDDEN);
    this.send(...args);
  }

  sendNotFoundError(...args) {
    this.res.status(STATUS_CODES.NOT_FOUND);
    this.send(...args);
  }

  sendInternalServerError(...args) {
    this.res.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
    this.send(...args);
  }
}

module.exports = Context;
