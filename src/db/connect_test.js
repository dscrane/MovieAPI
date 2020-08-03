require('dotenv').config();
const mongoose = require('mongoose');

const connectionURL = process.env.MOVIEAPP_DB_TEST_PATH;

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
