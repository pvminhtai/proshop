const express = require('express');
const { PORT } = require('./configs');
const { logger } = require('./helpers');
const loaders = require('./loaders');

(async () => {
  const app = express();

  await loaders(app);

  app
    .listen(PORT, () => logger.info(`🛡️  Server is running on port ${PORT} 🛡️`))
    .on('error', err => {
      logger.error(err);
      process.exit(1);
    });
})();
