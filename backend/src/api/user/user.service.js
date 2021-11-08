const { BadRequest, Conflict } = require('http-errors');
const { hash, compare } = require('bcrypt');
const { User } = require('../../database/models');
const { logger, TokenGenerator } = require('../../helpers');

class UserService {
  async createUser(data) {
    try {
      const duplicate = await User.findOne({ email: data.email });

      if (duplicate) {
        throw Conflict('This email is already exist!');
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
      throw BadRequest('Email and password are required!');
    }

    try {
      const validUser = await User.findOne({ email: user.email });
      if (!validUser) {
        throw BadRequest('Incorrect email!');
      }

      const match = await compare(user.password, validUser.password);
      if (!match) {
        throw BadRequest('Incorrect password!');
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

  // async changePassword(user, id) {}
}

module.exports = new UserService();
