const AuthService = require('./auth.service');

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async signUp(ctx) {
    try {
      const newUser = await this.authService.signUp(ctx.body);
      ctx.sendCreatedResponse({
        message: 'Register new account successfully',
        data: newUser
      });
    } catch (error) {
      ctx.sendError(error);
    }
  }

  async signIn(ctx) {
    try {
      const { user, accessToken } = await this.authService.signIn(ctx.body);
      ctx.sendSuccessResponse({
        message: 'Login successfully',
        data: { user, accessToken }
      });
    } catch (error) {
      ctx.sendError(error);
    }
  }

  async changePassword(ctx) {
    try {
      await this.authService.changePassword(ctx.body, ctx.user._id);
      ctx.sendSuccessResponse({ message: 'Change password successfully!' });
    } catch (error) {
      ctx.sendError(error);
    }
  }
}

module.exports = AuthController;
