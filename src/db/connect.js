require('dotenv').config();
const mongoose = require('mongoose');

const connectionURL = process.env.USER_DB_PATH;

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
