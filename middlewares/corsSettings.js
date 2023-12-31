const allowedCors = [
  'http://movies.krylovis.nomoreparties.sbs',
  'https://movies.krylovis.nomoreparties.sbs',
  'http://api.movies.krylovis.nomoreparties.sbs',
  'https://api.movies.krylovis.nomoreparties.sbs',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports.corsSettings = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
