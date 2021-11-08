/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const router = require('express').Router();
const { readdirSync } = require('fs');
const { NotFound } = require('http-errors');
const { resolve } = require('path');
const { API_PREFIX } = require('../constants');
const { Context, logger } = require('../helpers');
const permit = require('../middlewares/authorization.middleware');
const validate = require('../middlewares/validator');

const API = readdirSync(__dirname, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

API.forEach(folder => {
  const pathName = resolve(__dirname, folder, folder);

  try {
    const routes = require(`${pathName}.routes`);
    const controller = require(`${pathName}.controller`);

    routes.forEach(({ path, method, action, roles }) => {
      const { validateRequest, handler, ...middlewares } = controller[action];

      router[method](
        `${API_PREFIX}${path}`,
        permit(...roles),
        validate(validateRequest),
        Object.values(middlewares),
        (req, res) => handler(new Context(req, res))
      );
    });
  } catch (error) {
    logger.error(error);
  }
});

router.use((req, res, next) => {
  next(NotFound(`Route not found - ${req.originalUrl}`));
});

module.exports = router;
