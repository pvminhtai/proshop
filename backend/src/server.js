const App = require('./app');
const { PORT } = require('./config');

(async () => {
  const app = new App();

  await app.connectToDatabase();
  app.initializeMiddlewares();
  app.initializeRoutes();
  app.initializeErrorHandler();

  app.listen(PORT);
})();
