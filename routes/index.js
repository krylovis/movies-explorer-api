const router = require('express').Router();
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { requestLogger, errorLogger } = require('../middlewares/logger');

const authRoutes = require('./authRoutes');

router.use(requestLogger);

router.use(cookieParser());
router.use('/', authRoutes);

router.use(errorLogger);
router.use(errors());

module.exports = router;
