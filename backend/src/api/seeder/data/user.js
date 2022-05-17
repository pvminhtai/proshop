const { hashSync } = require('bcrypt');

module.exports = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: hashSync('123456', 10),
    role: 'Admin'
  },
  {
    name: 'Join Doe',
    email: 'join@example.com',
    password: hashSync('123456', 10)
  },
  {
    name: 'Steven Phan',
    email: 'steve@example.com',
    password: hashSync('123456', 10)
  }
];
