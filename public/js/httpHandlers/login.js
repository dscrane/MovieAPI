import axios from 'axios';

const loginRequest = (username, password) => {
  axios
    .post('/login', {
      username,
      password,
    })
    .then(res => {
      const accessToken = res.headers('Authentication').replace('Bearer ', '');
      lo;
    });
};
