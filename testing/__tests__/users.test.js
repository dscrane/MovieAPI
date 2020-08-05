require('dotenv').config();
const request = require('supertest');
const app = require('../../src/index_test');
const User = require('../../src/models/user');
const { Movie } = require('../../src/models/movies');
const {
  configDatabase,
  testUserOneId,
  testUserTwoId,
  testUserOne,
  testUserTwo,
} = require('../fixtures/db_config');

beforeEach(configDatabase);

test('Sign up a new user', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      name: 'Jest Test',
      email: 'jesttest@email.com',
      password: 'testpass123',
    })
    .expect(201);

  // Assert that the database was updated with the new user
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assert that the password was saved as a hash
  expect(user.password).not.toBe('testpass123');

  // Assertion about the response
  expect(response.body).toMatchObject({
    user: {
      name: 'Jest Test',
      email: 'jesttest@email.com',
      favorites: [],
    },
    token: user.tokens[0].token,
  });
});

test('Log in a user', async () => {
  const response = await request(app)
    .post('/login')
    .send({
      email: 'testuserone@email.com',
      password: 'testonepass123',
    })
    .expect(200);

  const user = await User.findById(response.body.user._id);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test('Fail to log in a user', async () => {
  await request(app)
    .post('/login')
    .send({
      email: 'testuserone@email.com',
      password: 'incorrectpass',
    })
    .expect(404);
});

test('Fetch authorized user profile', async () => {
  await request(app)
    .get('/users/profile')
    .set('Authorization', `Bearer ${testUserOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Fail to fetch unauthorized user profile', async () => {
  await request(app).get('/users/profile').send().expect(401);
});

test('Delete an authorized user account', async () => {
  await request(app)
    .delete('/users/profile')
    .set('Authorization', `Bearer ${testUserOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(testUserOneId);
  expect(user).toBeNull();
});

test('Add a new movie to a user favorites list', async () => {
  const response = await request(app)
    .patch('/users/profile/favorites')
    .set('Authorization', `Bearer ${testUserTwo.tokens[0].token}`)
    .send({
      movie: '5f281fc4737b950f55f3fb68',
    })
    .expect(200);

  const favorites = response.body[0];
  const movie = await Movie.findById('5f281fc4737b950f55f3fb68');

  expect(favorites).toMatchObject(movie);
});
