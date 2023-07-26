const router = require('express').Router();
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');

const { requestLogger, errorLogger } = require('../middlewares/logger');
const { corsSettings } = require('../middlewares/corsSettings');
const { limiter } = require('../utils/limiter');

const authRoutes = require('./authRoutes');
const usersRoutes = require('./usersRoutes');
const movieRoutes = require('./movieRoutes');

const NotFoundError = require('../custom-errors/NotFoundError');
const { PAGE_NOT_FOUND } = require('../utils/constants');

router.use(requestLogger);

router.use(limiter);
router.use(helmet());
router.use(corsSettings);
router.use(cookieParser());

router.use('/', authRoutes);
router.use('/users', usersRoutes);
router.use('/movies', movieRoutes);

router.use(errorLogger);
router.use(errors());
router.use('*', (req, res, next) => next(new NotFoundError(PAGE_NOT_FOUND)));

module.exports = router;
