require('dotenv').config();
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const publicDirectory = path.join(__dirname, '../public');

app.use(express.static(publicDirectory));

app.get('/', (req, res) => {
  res.send('Hello internet');
});

app.get('/about', (req, res) => {
  res.send('Hello internet');
});

app.listen(PORT, () => {
  console.log(`[app]: listening on localhost:${PORT}`);
});
