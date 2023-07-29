const Movies = require('../models/movie');

const NotFoundError = require('../custom-errors/NotFoundError');
const ForbiddenError = require('../custom-errors/ForbiddenError');

const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,

  MOVIE_NONEXISTENT,
  NO_RIGHTS_TO_DELETE,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  const { id } = req.user;

  Movies.find({ owner: id })
    .populate('owner')
    .then((movies) => res.status(HTTP_STATUS_OK).send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const { id } = req.user;

  Movies.create({ ...req.body, owner: id })
    .then((movie) => movie.populate('owner'))
    .then((movie) => res.status(HTTP_STATUS_CREATED).send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movies.findById(req.params.id)
    .then((findMovie) => {
      if (!findMovie) return next(new NotFoundError(MOVIE_NONEXISTENT));
      if (findMovie.owner.toString() !== req.user.id) {
        return next(new ForbiddenError(NO_RIGHTS_TO_DELETE));
      }
      return Movies.findByIdAndRemove(req.params.id)
        .then((movie) => res.status(HTTP_STATUS_OK).send(movie));
    })
    .catch(next);
};
