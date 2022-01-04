const { sign, verify } = require('jsonwebtoken');

const generateToken = (payload, secretKey, expiresIn = '1d') => {
  const { password, ...restInfo } = payload;
  return sign(restInfo, secretKey, { expiresIn });
};

const verifyToken = (token, secretKey) => {
  return verify(token, secretKey);
};

module.exports = { generateToken, verifyToken };
