const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
module.exports.generateToken = (id) => jwt.sign(
  { id },
  NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
  { expiresIn: '7d' },
);
