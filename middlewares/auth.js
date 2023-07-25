const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../custom-errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;
const { NEEDED_AUTHORIZATION } = require('../utils/constants');

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return next(new UnauthorizedError(NEEDED_AUTHORIZATION));

  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
  } catch (err) {
    return next(new UnauthorizedError(NEEDED_AUTHORIZATION));
  }

  req.user = payload;

  return next();
};
