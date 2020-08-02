const express = require('express');
const authenticate = require('../middlewares/authenticate');
const User = require('../models/user');

// Define a new router
const router = new express.Router();

router.post('/users', async (req, res) => {
  console.log('\x1b[31m [REQ]: \x1b[0m', req.body);
  const user = new User(req.body);

  try {
    await user.save();
    await user.generateAuthToken();
    res.redirect('/users/me');
  } catch (e) {
    console.log(e);
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

    res.cookie('userAuth', token, { maxAge: 9000000, httpOnly: true });

    res.redirect('/users/profile');
  } catch (e) {
    res.status(403).send();
  }
});

// Route to log a user out
router.post('/logout', authenticate, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.clearCookie('userAuth', { path: '/' });
    res.redirect('/');
  } catch (e) {
    console.log(e);
  }
});

// Route to a users profile
router.get('/users/profile', authenticate, (req, res) => {
  console.log(req.user);

  res.render('profile', {
    username: req.user.name,
  });
});

// Route to update a user profile
router.patch('/users/me', async (req, res) => {
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
    res.status(500).send(e);
  }
});

// Route to delete a user profile
router.delete('/users/me', authenticate, async (req, res) => {
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
    res.render('favorites');
  } catch (e) {
    console.log(e);
  }
});

// Route to update a users favorites list
router.patch('/users/me/favorites', async (req, res) => {
  try {
  } catch (e) {}
});

// Route to delete a users favorites list
router.delete('/users/me/favorites', authenticate, async (req, res) => {
  try {
    req.user.favorites = [];
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/redirect', async (req, res) => {
  res.render('errorMessage');
});

module.exports = router;
