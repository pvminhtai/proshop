const { config } = require('dotenv');

const dotenvConfig = config();
if (dotenvConfig.error) {
  throw new Error(`⚠️ ${dotenvConfig.error.message} ⚠️`);
}

const {
  MONGODB_URI,
  PORT,
  CORS_ORIGINS,
  SECRET_KEY,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET
} = process.env;

module.exports = {
  PORT: +PORT,
  MONGODB_URI,
  CORS_ORIGINS,
  SECRET_KEY,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET
};
