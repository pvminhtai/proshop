const { BadRequest, Conflict, InternalServerError } = require('http-errors');
const { hash, compare } = require('bcrypt');
const { User } = require('../../models');
const { logger, TokenGenerator } = require('../../helpers');

class UserService {
  async createUser(data) {
    try {
      const duplicate = await User.findOne({ email: data.email });

      if (duplicate) {
        throw new Conflict('This email is already exist!');
      }

      const newUser = await User.create({
        ...data,
        password: await hash(data.password, 10)
      });

      return {
        message: 'register new account successful',
        data: newUser
      };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async validateUser(user) {
    if (!user.email || !user.password) {
      throw new BadRequest('Email and password are required!');
    }

    try {
      const validUser = await User.findOne({ email: user.email });
      if (!validUser) {
        throw new BadRequest('Incorrect email!');
      }

      const match = await compare(user.password, validUser.password);
      if (!match) {
        throw new BadRequest('Incorrect password!');
      }

      const tokenGenerator = new TokenGenerator(user);
      const accessToken = tokenGenerator.generateAccessToken();
      const refreshToken = tokenGenerator.generateRefreshToken();

      return {
        message: 'Login success',
        data: { accessToken, refreshToken }
      };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async changePassword({ oldPassword, newPassword, confirmPassword }, id) {
    if (oldPassword === newPassword) {
      throw new BadRequest(
        'The old password cannot be the same as the new password!'
      );
    }

    if (newPassword !== confirmPassword) {
      throw new BadRequest(
        'The confirm password is not the same as the new password!'
      );
    }

    try {
      const userResult = await User.findById(id).exec();

      const comparePassword = await compare(oldPassword, userResult.password);
      if (!comparePassword) throw new BadRequest('Incorrect old password!');

      userResult.password = newPassword;
      await userResult.save();

      return { message: 'Change password successfully!' };
    } catch (error) {
      throw new InternalServerError(error);
    }
  }
}

module.exports = new UserService();
