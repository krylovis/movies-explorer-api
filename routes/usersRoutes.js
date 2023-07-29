const router = require('express').Router();
const { updateUserSchema } = require('../middlewares/joiSchemas');

const { getUser, updateUser } = require('../controllers/usersController');

router.get('/me', getUser);
router.patch('/me', updateUserSchema, updateUser);

module.exports = router;
