const mongoose = require('mongoose');
const { MONGODB_URI } = require('../configs');
const { logger } = require('../helpers');

module.exports = async () => {
  const conn = await mongoose.connect(MONGODB_URI, {
    retryWrites: true,
    w: 'majority'
  });
  return conn.connection.host;
};
