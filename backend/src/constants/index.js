exports.LOG_LEVEL = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  HTTP: 'http',
  VERBOSE: 'verbose',
  DEBUG: 'debug',
  SILLY: 'silly'
};

exports.API_PREFIX = '/api/v1';

exports.ALLOWED_ROUTE_METHOD = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete'
};

exports.ALLOWED_REQUEST_PROPS = {
  PARAMS: 'params',
  QUERY: 'query',
  BODY: 'body',
  PAGINATION: 'pagination',
  SORTER: 'sorter'
};

exports.STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

exports.USER_ROLES = {
  ADMIN: 'Admin',
  USER: 'User',
  GUEST: 'Guest'
};
