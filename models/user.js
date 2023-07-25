const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UnauthorizedError = require('../custom-errors/UnauthorizedError');

const {
  WRONG_EMAIL_FORMAT,
  WRONG_EMAIL_OR_PASSWORD,
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: WRONG_EMAIL_FORMAT,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) throw new UnauthorizedError(WRONG_EMAIL_OR_PASSWORD);
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) throw new UnauthorizedError(WRONG_EMAIL_OR_PASSWORD);
          return user;
        });
    });
}

userSchema.statics.findUserByCredentials = findUserByCredentials;

module.exports = mongoose.model('user', userSchema);
