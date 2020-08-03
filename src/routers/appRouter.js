const express = require('express');

const router = new express.Router();

router.get('/', (req, res) => {
  console.log('\x1b[31m Auth Token \x1b[0m', req.cookies.userAuth);
  if (req.cookies.userAuth === undefined) {
    return res.render('home');
    //return res.send('User is not logged in');
  }

  res.redirect('/users/profile');
});

module.exports = router;
