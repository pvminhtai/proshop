const userService = require('./user.service');

const registerAccount = {
  handler: async ctx => {
    const userInput = ctx.getRequestBody();

    try {
      const { message, data } = await userService.createUser(userInput);
      ctx.sendCreatedResponse(message, data);
    } catch (error) {
      ctx.sendError(error);
    }
  }
};

const loginAccount = {
  handler: async ctx => {
    const userInput = ctx.getRequestBody();

    try {
      const { message, data } = await userService.validateUser(userInput);
      ctx.sendSuccessResponse(message, data);
    } catch (error) {
      ctx.sendError(error);
    }
  }
};

const changePassword = {
  handler: async ctx => {
    const changePasswordDTO = ctx.getRequestBody();
  }
};

module.exports = {
  registerAccount,
  loginAccount,
  changePassword
};
