require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const {
  PORT = 3000,
  MONGO_URL = 'mongodb://localhost:27017',
} = process.env;

mongoose.connect(`${MONGO_URL}/bitfilmsdb`);

app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
