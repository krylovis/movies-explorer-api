const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { updateUserSchema, getUserSchema } = require('../middlewares/joiSchemas');

const { getUser, updateUser } = require('../controllers/usersController');

router.get('/me', auth, getUserSchema, getUser);
router.patch('/me', auth, updateUserSchema, updateUser);

module.exports = router;
