const User = require('../models/user');

const {
  HTTP_STATUS_OK,
  EMAIL_ALREADY_EXISTS,
  INVALID_USER_UPDATE,
} = require('../utils/constants');
const ConflictError = require('../custom-errors/ConflictError');
const BadRequestError = require('../custom-errors/ConflictError');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  return User.findOne({ email })
    .then((user) => {
      const isUser = user && user?._id.toString() !== req.user.id;
      if (isUser) {
        return next(new ConflictError(EMAIL_ALREADY_EXISTS));
      }

      return User.findByIdAndUpdate(
        req.user.id,
        { name, email },
        { new: true, runValidators: true },
      )
        .then((foundUser) => res.status(HTTP_STATUS_OK).send(foundUser))
        .catch((err) => {
          if (err.name === 'ValidationError') return next(new BadRequestError(INVALID_USER_UPDATE));
          return next(err);
        });
    })
    .catch(next);
};
