const ProductService = require('./product.service');

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  async getAllProducts(ctx) {
    try {
      const { products, total } = await this.productService.getProducts();
      ctx.sendSuccessResponse({
        message: `${total} product${total > 1 ? 's' : ''} found`,
        data: products,
        meta: { total }
      });
    } catch (error) {
      ctx.sendError(error);
    }
  }

  async getOneProduct(ctx) {
    const { id } = ctx.params;

    try {
      const product = await this.productService.getProductById(id);
      ctx.sendSuccessResponse({
        message: '1 product found',
        data: product
      });
    } catch (error) {
      ctx.sendError(error);
    }
  }

  async createProduct(ctx) {
    try {
      const newProduct = await this.productService.createProduct(ctx.body);
      ctx.sendCreatedResponse({
        message: 'Create new product successfully',
        data: newProduct
      });
    } catch (error) {
      ctx.sendError(error);
    }
  }

  async updateProduct(ctx) {
    const { id } = ctx.params;

    try {
      const updatedProduct = await this.productService.updateProductById(id, ctx.body);
      ctx.sendCreatedResponse({
        message: `Update product id ${id} successfully`,
        data: updatedProduct
      });
    } catch (error) {
      ctx.sendError(error);
    }
  }

  async deleteProduct(ctx) {
    const { id } = ctx.params;

    try {
      const product = await this.productService.deleteProductById(id);
      ctx.sendSuccessResponse({
        message: `Delete product id ${id} successfully`,
        data: product
      });
    } catch (error) {
      ctx.sendError(error);
    }
  }
}

module.exports = ProductController;
