const dotenv = require('dotenv');

dotenv.config();

const { MONGODB_URI, PORT, CORS_ORIGINS, SECRET_KEY, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } =
  process.env;

module.exports = {
  PORT,
  MONGODB_URI,
  CORS_ORIGINS,
  SECRET_KEY,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET
};
