const { celebrate, Joi } = require('celebrate');

// User schemes
module.exports.createUserSchema = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

module.exports.loginSchema = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

module.exports.updateUserSchema = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

// Movie schemes
module.exports.createMovieSchema = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.string().required(),
    year: Joi.date().format('YYYY'),
    description: Joi.string().required(),
    image: Joi.string().required().regex(/^(http|https):\/\/[^ "]+$/),
    trailerLink: Joi.string().required().regex(/^(http|https):\/\/[^ "]+$/),
    thumbnail: Joi.string().required().regex(/^(http|https):\/\/[^ "]+$/),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().pattern(/[а-я\\ё\d\W|_]/gi),
    nameEN: Joi.string().required().pattern(/[^а-я\\ё]/gi),
  }),
});

module.exports.deleteMovieSchema = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
});
