const express = require('express');
const { Movie } = require('../models/movies');

// Define a new router
const router = new express.Router();

// Route to get a list of movies
router.get('/movies/:id', async (req, res) => {
  console.log(req.params);
  const _id = req.params.id;
  try {
    const movie = await Movie.findById({ _id });

    if (!movie) {
      return res.status(400).send();
    }

    res.send(movie);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
