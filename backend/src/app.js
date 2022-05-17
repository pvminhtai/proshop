/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const cookieParser = require('cookie-parser');
const express = require('express');
const { connect } = require('mongoose');
const { readdir } = require('fs/promises');
const { join } = require('path');
const { MONGODB_URI } = require('./config');
const { logger } = require('./api/helpers');
const { errorMiddlewares, cors, authentication } = require('./api/middlewares');
const { API_PREFIX } = require('./api/constants');

class App {
  constructor() {
    this.app = express();
  }

  async connectToDatabase() {
    try {
      const { connection } = await connect(MONGODB_URI, {
        retryWrites: true,
        w: 'majority'
      });
      logger.info(`✔ Database connected - ${connection.db.databaseName}`);
    } catch (error) {
      logger.error(`Cannot connect to database - ${error}`);
      process.exit(1);
    }
  }

  initializeMiddlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors);
    this.app.use(cookieParser());
    this.app.use(authentication);
  }

  async initializeRoutes() {
    const dirents = await readdir(`${__dirname}/api/routes`, { withFileTypes: true });
    dirents.forEach(dirent => {
      if (dirent.isDirectory()) {
        const path = join(__dirname, 'api/routes', dirent.name, dirent.name);
        const route = new (require(`${path}.routes`))();
        this.app.use(API_PREFIX, route.router);
      }
    });
  }

  initializeErrorHandler() {
    this.app.use(errorMiddlewares);
  }

  listen(port = 5000) {
    this.app.listen(port, () => logger.info(`🛡️ Server is running on port ${port} 🛡️`));
  }
}

module.exports = App;
