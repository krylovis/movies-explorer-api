const router = require('express').Router();
const { createUser, login, logout } = require('../controllers/usersController');
const { createUserSchema, loginSchema } = require('../middlewares/joiSchemas');

router.post('/signup', createUserSchema, createUser);
router.post('/signin', loginSchema, login);
router.post('/logout', logout);

module.exports = router;
