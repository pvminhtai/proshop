const { Schema, model } = require('mongoose');
const { USER_ROLES } = require('../constants');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.USER
    }
  },
  {
    timestamps: true
  }
);

const User = model('User', userSchema);

module.exports = User;
