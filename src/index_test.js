require('dotenv').config();
const express = require('express');
const userRouter = require('./routers/userRouter');
const movieRouter = require('./routers/movieRouter');
const appRouter = require('./routers/appRouter');

// Set up database connection
require('./db/connect_test.js');

// Set up express application
const app = express();
// Have express parse incoming json
app.use(express.json());
// Connecting the routers to the express app
app.use(appRouter);
app.use(userRouter);
app.use(movieRouter);

module.exports = app;
