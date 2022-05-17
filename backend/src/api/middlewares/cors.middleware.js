const cors = require('cors');
const { CORS_ORIGINS } = require('../../config');

const origins = CORS_ORIGINS.split(',');

const corsOptions = {
  origin: origins.length === 1 ? origins[0] : origins,
  optionSuccessStatus: 200
};

module.exports = cors(corsOptions);
