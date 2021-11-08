const { ALLOWED_ROUTE_METHOD, USER_ROLES } = require('../../constants');

const { POST, PATCH } = ALLOWED_ROUTE_METHOD;
const { ADMIN, GUEST, USER } = USER_ROLES;

module.exports = [
  {
    path: '/users/register',
    method: POST,
    roles: [GUEST],
    action: 'registerAccount'
  },
  {
    path: '/users/login',
    method: POST,
    roles: [GUEST],
    action: 'loginAccount'
  },
  {
    path: '/users/:username',
    method: PATCH,
    roles: [USER, ADMIN],
    action: 'changePassword'
  }
];
