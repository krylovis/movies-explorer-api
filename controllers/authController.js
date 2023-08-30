const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateToken } = require('../utils/jwt');

const ConflictError = require('../custom-errors/ConflictError');

const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,

  USER_ALREADY_EXISTS,
} = require('../utils/constants');

const getUserData = (user) => (
  {
    _id: user._id,
    name: user.name,
    email: user.email,
  }
);

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => {
      const token = generateToken(user._id);
      res.cookie('jwt', token, {
        httpOnly: true, sameSite: true,
      });
      res.status(HTTP_STATUS_CREATED).send(getUserData(user));
    })
    .catch((err) => {
      if (err.code === 11000) return next(new ConflictError(USER_ALREADY_EXISTS));
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateToken(user._id);
      res.cookie('jwt', token, {
        httpOnly: true, sameSite: true,
      });
      return res.status(HTTP_STATUS_OK).send(getUserData(user));
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt');
  return res.status(HTTP_STATUS_OK).send({});
};
