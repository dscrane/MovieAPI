const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  year: {
    type: Number,
  },
  cast: [String],
  genres: [String],
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = { Movie, movieSchema };
