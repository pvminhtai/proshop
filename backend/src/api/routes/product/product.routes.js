const { Router } = require('express');
const { USER_ROLE } = require('../../constants');
const { Context } = require('../../helpers');
const { verifyRoles } = require('../../middlewares');
const ProductController = require('./product.controller');

const { ADMIN } = USER_ROLE;

class ProductRoute {
  constructor() {
    this.path = '/products';
    this.router = Router();
    this.productController = new ProductController();
    this.#initializeRoutes();
  }

  #initializeRoutes() {
    this.router.get(this.path, (req, res) => {
      this.productController.getAllProducts(new Context(req, res));
    });

    this.router.get(`${this.path}/:id`, (req, res) => {
      this.productController.getOneProduct(new Context(req, res));
    });

    this.router.post(this.path, verifyRoles(ADMIN), (req, res) => {
      this.productController.createProduct(new Context(req, res));
    });

    this.router.put(`${this.path}/:id`, verifyRoles(ADMIN), (req, res) => {
      this.productController.updateProduct(new Context(req, res));
    });

    this.router.delete(`${this.path}/:id`, verifyRoles(ADMIN), (req, res) => {
      this.productController.deleteProduct(new Context(req, res));
    });
  }
}

module.exports = ProductRoute;
