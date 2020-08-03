const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');

const testUserOneId = new mongoose.Types.ObjectId();
const testUserOne = {
  _id: testUserOneId,
  name: 'Test User One',
  email: 'testuserone@email.com',
  password: 'testonepass123',
  tokens: [
    {
      token: jwt.sign({ _id: testUserOneId }, process.env.JWT_SECRET),
    },
  ],
};

const testUserTwoId = new mongoose.Types.ObjectId();
const testUserTwo = {
  _id: testUserTwoId,
  name: 'Test User Two',
  email: 'testusertwo@email.com',
  password: 'testtwopass123',
  tokens: [
    {
      token: jwt.sign({ _id: testUserOneId }, process.env.JWT_SECRET),
    },
  ],
};

const configDatabase = async () => {
  await User.deleteMany();
  await new User(testUserOne);
  await new User(testUserTwo);
};

module.exports = {
  configDatabase,
  testUserOneId,
  testUserTwoId,
  testUserOne,
  testUserTwo,
};
