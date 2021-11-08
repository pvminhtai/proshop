const { NotFound } = require('http-errors');
const { Product } = require('../../database/models');
const { logger } = require('../../helpers');

class ProductService {
  async getProducts() {
    try {
      const products = await Product.find();

      return {
        message: `${products.length} products found`,
        data: products,
        metadata: { total: products.length }
      };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const product = await Product.findById(id);

      if (!product) {
        throw NotFound(`Product ID ${id} was not found`);
      }

      return {
        message: '1 product found',
        data: product
      };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async createProduct(data) {
    try {
      return {
        message: 'Created new product successfully',
        data: await Product.create(data)
      };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async updateProductById(id, data) {
    try {
      const product = await Product.findByIdAndUpdate(id, data);

      if (!product) {
        throw NotFound(`Product ID ${id} was not found`);
      }

      return {
        message: `Update product ID ${id} successfully`,
        data: product
      };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async deleteProductById(id) {
    try {
      const product = await Product.findByIdAndDelete(id);

      if (!product) {
        throw NotFound(`Product ID ${id} was not found`);
      }

      return {
        message: `Delete product ID ${id} successfully`,
        data: product
      };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}

module.exports = new ProductService();
