const mongooseLoader = require('./mongoose');
const expressLoader = require('./express');
const { logger } = require('../helpers');

module.exports = async expressApp => {
  try {
    const mongoConnection = await mongooseLoader();
    logger.info(`✔  MongoDB connected: ${mongoConnection}`);
  } catch (error) {
    logger.error(`Cannot connect to database - ${error}`);
    process.exit(1);
  }

  expressLoader(expressApp);
  logger.info('✔  Express loaded');
};
