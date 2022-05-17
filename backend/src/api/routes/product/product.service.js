const { NotFound } = require('http-errors');
const { Product } = require('../../models');
const { logger } = require('../../helpers');

class ProductService {
  async getProducts() {
    try {
      const products = await Product.find().exec();

      return {
        products,
        total: products.length
      };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const product = await Product.findById(id).exec();

      if (!product) {
        throw new NotFound(`Product id ${id} was not found`);
      }

      return product;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async createProduct(data) {
    try {
      return await Product.create(data);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async updateProductById(id, data) {
    try {
      const product = await Product.findByIdAndUpdate(id, data).exec();

      if (!product) {
        throw new NotFound(`Product id ${id} was not found`);
      }

      return product;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async deleteProductById(id) {
    try {
      const product = await Product.findByIdAndDelete(id).exec();

      if (!product) {
        throw new NotFound(`Product id ${id} was not found`);
      }

      return product;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}

module.exports = ProductService;
