const { Router } = require('express');
const { USER_ROLE } = require('../../constants');
const { Context } = require('../../helpers');
const { verifyRoles } = require('../../middlewares');
const AuthController = require('./auth.controller');

const { ADMIN, USER } = USER_ROLE;

class AuthRoute {
  constructor() {
    this.path = '/account';
    this.router = Router();
    this.authController = new AuthController();
    this.#initializeRoutes();
  }

  #initializeRoutes() {
    this.router.post(`${this.path}/register`, (req, res) => {
      this.authController.signUp(new Context(req, res));
    });

    this.router.post(`${this.path}/login`, (req, res) => {
      this.authController.signIn(new Context(req, res));
    });

    this.router.put(`${this.path}/password`, verifyRoles(ADMIN, USER), (req, res) => {
      this.authController.changePassword(new Context(req, res));
    });
  }
}

module.exports = AuthRoute;
