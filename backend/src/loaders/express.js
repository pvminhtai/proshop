const middlewares = require('../middlewares');

module.exports = app => {
  app.use(...middlewares);
};
