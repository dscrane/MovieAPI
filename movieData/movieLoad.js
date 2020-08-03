const mongoose = require('mongoose');
const movies = require('../other/data.js');
const fs = require('fs');

const connectionURL = 'mongodb://127.0.0.1:27017/movieapp_test';

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

const genres = [
  'Superhero',
  'Action',
  'Adventure',
  'Musical',
  'Fantasy',
  'Drama',
  'Mystery',
  'Comedy',
  'Biography',
  'Crime',
  'Thriller',
  'Romance',
  'Superhero',
  'Science Fiction',
  'Documentary',
  'Noir',
  'Historical',
  'Horror',
  'Animated',
  'Sports',
  'Other',
];

const movieSchema = mongoose.Schema({
  title: String,
  year: Number,
  cast: [String],
  genres: [String],
});
const Movie = mongoose.model('Movie', movieSchema);

let num = movies.length;

for (let i = num; i > num - 10; i--) {
  db.once('open', async () => {
    const movieToAdd = new Movie(movies[i]);
    await movieToAdd.save();
  });
}

/*

const lists = genres.map(genre => {
  let genreList;
  if (genre === 'Other') {
    genreList = movies.filter(movie => {
      return movie.genres.length === 0;
    });
  } else {
    genreList = movies.filter(movie => {
      return movie.genres.includes(genre);
    });
  }

  return genreList;
});


lists.forEach((list, i) => {
  db.once('open', () => {
    console.log('Connection was successful');
    list.forEach(async movie => {
      const movieToAdd = new Movie(movie);

      await movieToAdd.save((err, movie) => {
        if (err) return console.log(err);
      });
    });
  });
  console.log(`${genres[i]} list added to the db`);
}); */

/* 
  const genreListJSON = JSON.stringify(genreList);

  fs.writeFile(
    `../genre-lists/${
      genre === 'Science Fiction' ? 'science-fiction' : genre.toLowerCase()
    }.json`,
    genreListJSON,
    err => (err ? console.log(err) : console.log('json added successfuly '))
  );
  });
 */
