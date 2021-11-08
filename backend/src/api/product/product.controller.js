const productService = require('./product.service');
const { getProductParamsSchema } = require('./schemas');

const getAllProducts = {
  handler: async ctx => {
    try {
      const { message, data, metadata } = await productService.getProducts();
      ctx.sendSuccessResponse(message, data, metadata);
    } catch (error) {
      ctx.sendError(error);
    }
  }
};

const getOneProduct = {
  validateRequest: { params: getProductParamsSchema },
  handler: async ctx => {
    const id = ctx.getRequestParams('id');

    try {
      const { message, data } = await productService.getProductById(id);
      ctx.sendSuccessResponse(message, data);
    } catch (error) {
      ctx.sendError(error);
    }
  }
};

const createProduct = {
  handler: async ctx => {
    const bodyData = ctx.getRequestBody();

    try {
      const { message, data } = await productService.createProduct(bodyData);
      ctx.sendCreatedResponse(message, data);
    } catch (error) {
      ctx.sendError(error);
    }
  }
};

const updateProduct = {
  handler: async ctx => {
    const id = ctx.getRequestParams('id');
    const bodyData = ctx.getRequestBody();

    try {
      const { message, data } = await productService.updateProductById(
        id,
        bodyData
      );
      ctx.sendCreatedResponse(message, data);
    } catch (error) {
      ctx.sendError(error);
    }
  }
};

const deleteProduct = {
  handler: async ctx => {
    const id = ctx.getRequestParams('id');

    try {
      const { message, data } = await productService.deleteProductById(id);
      ctx.sendSuccessResponse(message, data);
    } catch (error) {
      ctx.sendError(error);
    }
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
