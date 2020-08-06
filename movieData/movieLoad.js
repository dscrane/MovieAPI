const mongoose = require('mongoose');
const movies = require('./data.js');

const args = process.argv.slice(2);
console.log(process.argv);
let connectionURL;

if (args[0] === '--db') {
  connectionURL = args[1];
} else {
  console.log('--db must be a mongodb srv');
}

mongoose
  .connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(
    () => console.log('Database connection successful'),
    err => console.log(err)
  );

const db = mongoose.connection;

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
