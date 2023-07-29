require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { MONGOOSE_FULL_URL } = require('./utils/mongodb');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(MONGOOSE_FULL_URL);

app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(PORT);
