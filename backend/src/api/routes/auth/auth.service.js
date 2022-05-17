const { BadRequest, Conflict } = require('http-errors');
const { sign } = require('jsonwebtoken');
const { User } = require('../../models');
const { logger } = require('../../helpers');
const { ACCESS_TOKEN_SECRET } = require('../../../config');

class AuthService {
  async signUp(userInputDTO) {
    const { email } = userInputDTO;

    try {
      const duplicateUser = await User.findOne({ email }).select('-password').exec();

      if (duplicateUser) {
        throw new Conflict('This email is already exist!');
      }

      return await User.create(userInputDTO);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async signIn(userInputDTO) {
    if (!userInputDTO.email || !userInputDTO.password) {
      throw new BadRequest('Email and password are required.');
    }

    try {
      const user = await User.findOne({ email: userInputDTO.email }).select('-password').exec();
      if (!user) {
        throw new BadRequest('Email does not exist.');
      }

      const validPassword = await user.comparePassword(userInputDTO.password);
      if (!validPassword) {
        throw new BadRequest('Invalid password.');
      }

      const accessToken = this.#generateToken(user);
      return {
        user,
        accessToken
      };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async changePassword({ oldPassword, newPassword, confirmPassword }, id) {
    if (oldPassword === newPassword) {
      throw new BadRequest('The old password cannot be the same as the new password!');
    }

    if (newPassword !== confirmPassword) {
      throw new BadRequest('Confirm password is not match with the new password!');
    }

    try {
      const user = await User.findById(id).exec();

      const isValidPassword = await user.comparePassword(oldPassword);
      if (!isValidPassword) {
        throw new BadRequest('Incorrect old password!');
      }

      user.password = newPassword;
      return await user.save();
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  #generateToken(user) {
    const expiresIn = 60 * 60;
    return {
      expiresIn,
      token: sign({ id: user._id }, ACCESS_TOKEN_SECRET, { expiresIn })
    };
  }
}

module.exports = AuthService;
