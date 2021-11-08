const { ALLOWED_ROUTE_METHOD, USER_ROLES } = require('../../constants');

const { GET, POST, PATCH, DELETE } = ALLOWED_ROUTE_METHOD;
const { ADMIN, GUEST, USER } = USER_ROLES;

module.exports = [
  {
    path: '/products',
    method: GET,
    roles: [ADMIN, USER, GUEST],
    action: 'getAllProducts'
  },
  {
    path: '/products/:id',
    method: GET,
    roles: [ADMIN, USER, GUEST],
    action: 'getOneProduct'
  },
  {
    path: '/products',
    method: POST,
    roles: [ADMIN],
    action: 'createProduct'
  },
  {
    path: '/products/:id',
    method: PATCH,
    roles: [ADMIN],
    action: 'updateProduct'
  },
  {
    path: '/products/:id',
    method: DELETE,
    roles: [ADMIN],
    action: 'deleteProduct'
  }
];
