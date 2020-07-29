const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  year: {
    type: Number,
  },
  cast: [
    {
      actor: {
        type: String,
        trim: true,
      },
    },
  ],
  genres: [
    {
      genre: {
        type: String,
        trim: true,
      },
    },
  ],
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
