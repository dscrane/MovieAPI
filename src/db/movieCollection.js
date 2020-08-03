require('dotenv').config();
const mongoose = require('mongoose');

const movieConnectionURL = process.env.MOVIE_DB_PATH;

const movieApiConnection = () => {
  mongoose.connect(movieConnectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};
module.exports = movieApiConnection;
