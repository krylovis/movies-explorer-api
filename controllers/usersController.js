const User = require('../models/user');

const { HTTP_STATUS_OK } = require('../utils/constants');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user.id, { name, email }, { new: true, runValidators: true })
    .then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch(next);
};
