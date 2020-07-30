// import axios from 'axios';

const loginForm = document.querySelector('#login-form');

console.log(loginForm);

const loginRequest = (email, password) => {
  return axios
    .post('http://localhost:3000/login', {
      email,
      password,
    })
    .then(res => console.log(res));
};

loginForm.addEventListener('submit', e => {
  const email = e.target.elements.email.value;
  const password = e.target.elements.password.value;
  console.log(email, password);
  loginRequest(email, password);
});
