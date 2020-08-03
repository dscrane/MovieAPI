const express = require('express');
const authenticate = require('../middlewares/authenticate');
const User = require('../models/user');
const { Movie } = require('../models/movies');

// Define a new router
const router = new express.Router();

// Route to create a new user
router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    await user.generateAuthToken();

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Route to log a user in
router.post('/login', async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (e) {
    res.status(404).send();
  }
});

// Route to log a user out
router.post('/logout', authenticate, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// Route to a users profile
router.get('/users/profile', authenticate, (req, res) => {
  res.send(req.user);
});

// Route to update a user profile
router.patch('/users/profile', authenticate, async (req, res) => {
  const updates = Object.keys(req.body);
  const validAlterations = ['name', 'email', 'password'];

  const validUpdate = updates.every(update => {
    return validAlterations.includes(update);
  });

  if (!validUpdate) {
    res.status(400).send({ error: 'One or more of the updates is invalid' });
  }

  try {
    updates.forEach(update => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

// Route to delete a user profile
router.delete('/users/profile', authenticate, async (req, res) => {
  try {
    req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

// Route to a users favorites list
router.get('/users/profile/favorites', authenticate, async (req, res) => {
  try {
    res.send(req.user.favorites);
  } catch (e) {
    res.status(500).send();
  }
});

// Route to update a users favorites list
router.patch('/users/profile/favorites', authenticate, async (req, res) => {
  try {
    const favoriteMovie = await Movie.findById({ _id: req.body.movie });

    req.user.favorites.push(favoriteMovie);

    await req.user.save();
    res.send(req.user.favorites);
  } catch (e) {
    res.status(500).send();
  }
});

// Route to delete a users favorites list
router.delete('/users/profile/favorites', authenticate, async (req, res) => {
  try {
    req.user.favorites = [];
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
