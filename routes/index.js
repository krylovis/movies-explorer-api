const router = require('express').Router();
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { requestLogger, errorLogger } = require('../middlewares/logger');

router.use(requestLogger);

router.use(cookieParser());

router.use(errorLogger);
router.use(errors());

module.exports = router;
