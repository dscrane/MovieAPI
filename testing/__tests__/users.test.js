require('dotenv').config();
const request = require('supertest');
const app = require('../../src/index_test');
const User = require('../../src/models/user');
const {
  configDatabase,
  testUserOneId,
  testUserTwoId,
  testUserOne,
  testUserTwo,
} = require('../fixtures/db_config');

beforeEach(configDatabase);
test('Sign up a new user', async () => {
  const res = await request(app)
    .post('/users')
    .send({
      name: 'Jest Test',
      email: 'jesttest@email.com',
      password: 'testpass123',
    })
    .expect(201);

  // Assert that the database was updated with the new user
  const user = await User.findById(res.body.user._id);
  expect(user).not.toBeNull();

  // Assert that the password was saved as a hash
  expect(user.password).not.toBe('testpass123');
});
