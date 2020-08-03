require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
  try {
    // const userAuthCookie = req.cookies.userAuth;
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;

    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate' });
    //res.redirect('/redirect');
  }
};

// COOKIE BASED AUTHENTICATION
/* const authenticate = async (req, res, next) => {
  try {
    // const userAuthCookie = req.cookies.userAuth;
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(userAuthCookie, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': userAuthCookie,
    });

    if (!user) {
      throw new Error();
    }

    req.token = userAuthCookie;
    req.user = user;

    next();
  } catch (e) {
    res.redirect('/redirect');
  }
}; */

module.exports = authenticate;
