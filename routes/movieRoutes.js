const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { createMovieSchema, deleteMovieSchema } = require('../middlewares/joiSchemas');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/moviesController');

router.get('/', auth, getMovies);
router.post('/', auth, createMovieSchema, createMovie);
router.delete('/:id', auth, deleteMovieSchema, deleteMovie);

module.exports = router;
