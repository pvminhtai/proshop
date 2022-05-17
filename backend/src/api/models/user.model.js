const { compare, genSalt, hash } = require('bcrypt');
const { Schema, model } = require('mongoose');
const { USER_ROLE: USER_ROLES } = require('../constants');

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: String,
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

userSchema.methods.comparePassword = async password => {
  return compare(password, this.password);
};

userSchema.pre('save', async next => {
  if (!this.isModified('password')) next();
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

module.exports = model('User', userSchema);
