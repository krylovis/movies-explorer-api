const http2 = require('http2');

const { constants } = http2;
const {
  HTTP_STATUS_OK, // 200
  HTTP_STATUS_CREATED, // 201

  HTTP_STATUS_BAD_REQUEST, // 400
  HTTP_STATUS_UNAUTHORIZED, // 401
  HTTP_STATUS_FORBIDDEN, // 403
  HTTP_STATUS_NOT_FOUND, // 404
  HTTP_STATUS_CONFLICT, // 409

  HTTP_STATUS_INTERNAL_SERVER_ERROR, // 500,
} = constants;

module.exports = {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,

  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_CONFLICT,

  HTTP_STATUS_INTERNAL_SERVER_ERROR,
};

module.exports.NEEDED_AUTHORIZATION = 'Необходима авторизация';
module.exports.NO_RIGHTS_TO_DELETE = 'Нет прав для удаления';
module.exports.PAGE_NOT_FOUND = 'Страница не найдена';
module.exports.DEFAULT_ERROR = 'Ошибка по умолчанию';

module.exports.WRONG_EMAIL_FORMAT = 'Неправильный формат почты';
module.exports.WRONG_LINK_FORMAT = 'Неправильный формат ссылки';
module.exports.WRONG_EMAIL_OR_PASSWORD = 'Неправильные почта или пароль';
