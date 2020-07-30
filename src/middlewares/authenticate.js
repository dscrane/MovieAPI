require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
  try {
    const userAuthCookie = req.cookies.userAuth;
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
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = authenticate;
