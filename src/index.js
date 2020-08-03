require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const userRouter = require('./routers/userRouter');
const movieRouter = require('./routers/movieRouter');
const appRouter = require('./routers/appRouter');

// Set up database connection
require('./db/connect.js');

// Set up express application
const app = express();
const PORT = process.env.PORT || 3000;

// Set up morgan for logging
app.use(morgan('combined'));

// Set up helmet for additional site security
app.use(helmet());

// Set up CORS for site security
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

// Have express parse incoming json
app.use(express.json());
// Connecting the routers to the express app
app.use(appRouter);
app.use(userRouter);
app.use(movieRouter);

app.listen(PORT, () => {
  console.log(`[app]: listening on localhost:${PORT}`);
});
