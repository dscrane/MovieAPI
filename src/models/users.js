const mongoose = require('mongoose');
const Movie = require('./movies');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    unique: true,
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
  },
  favorites: [
    {
      type: Movie,
    },
  ],

  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
});

const User = mongoose.model('User', userSchema);
