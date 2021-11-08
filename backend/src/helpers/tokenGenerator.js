const { sign } = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../configs');

class TokenGenerator {
  constructor(user) {
    this.user = user;
  }

  generateAccessToken() {
    const { password, ...payload } = this.user;
    return sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: '5m'
    });
  }

  generateRefreshToken() {
    const { password, ...payload } = this.user;
    return sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: '1d'
    });
  }
}

module.exports = TokenGenerator;
