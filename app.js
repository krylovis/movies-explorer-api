require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const { PORT, MONGO_URL, BD_NAME } = process.env;

mongoose.connect(`${MONGO_URL}/${BD_NAME}`);

app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
