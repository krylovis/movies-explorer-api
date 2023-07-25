const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { updateUserSchema } = require('../middlewares/joiSchemas');

const { getUser, updateUser } = require('../controllers/usersController');

router.get('/me', auth, getUser);
router.patch('/me', auth, updateUserSchema, updateUser);

module.exports = router;
