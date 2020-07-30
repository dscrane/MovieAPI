require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const hbs = require('hbs');
const helmet = require('helmet');
const morgan = require('morgan');
const userRouter = require('./routers/userRouter');
const movieRouter = require('./routers/movieRouter');
const appRouter = require('./routers/appRouter');

// Set up database connection
require('./db/connect.js');

// Define paths for the express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up express application
const app = express();
const PORT = process.env.PORT || 3000;

// Set up handlebars engine and views & partials locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up morgan for logging
app.use(morgan('combined'));

// Set up helmet for additional site security
app.use(helmet());
app.use(cors());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

// Connect the express app to the public directory
app.use(express.static(publicDirectory));

// Have express parse incoming json
app.use(express.json());
// Connecting the routers to the express app
app.use(appRouter);
app.use(userRouter);
app.use(movieRouter);

app.listen(PORT, () => {
  console.log(`[app]: listening on localhost:${PORT}`);
});
