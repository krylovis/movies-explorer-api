const router = require('express').Router();
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('../middlewares/logger');
const { corsSettings } = require('../middlewares/corsSettings');
const authRoutes = require('./authRoutes');
const usersRoutes = require('./usersRoutes');
const movieRoutes = require('./movieRoutes');

router.use(requestLogger);

router.use(corsSettings);
router.use(cookieParser());

router.use('/', authRoutes);
router.use('/users', usersRoutes);
router.use('/movies', movieRoutes);

router.use(errorLogger);
router.use(errors());

module.exports = router;
