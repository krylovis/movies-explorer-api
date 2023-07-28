const router = require('express').Router();
const { createUser, login, logout } = require('../controllers/authController');
const { createUserSchema, loginSchema } = require('../middlewares/joiSchemas');
const { auth } = require('../middlewares/auth');

router.post('/signup', createUserSchema, createUser);
router.post('/signin', loginSchema, login);
router.post('/logout', auth, logout);

module.exports = router;
