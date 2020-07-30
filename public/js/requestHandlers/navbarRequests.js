// Elements
const profileCta = document.querySelector('#profile-cta');
const favoritesCta = document.querySelector('#favorites-cta');
const logoutCta = document.querySelector('#logout-cta');

// Request URL
const url = 'http://localhost:3000';

// Set up profile-cta routing
profileCta.addEventListener('click', e => {
  // e.preventDefault();
  window.location.href = `${url}/users/profile`;
});

favoritesCta.addEventListener('click', e => {
  // e.preventDefault();
  window.location.href = `${url}/users/profile/favorites`;
});

logoutCta.addEventListener('click', e => {
  // e.preventDefault();
  axios.post(`${url}/logout`).then(() => (window.location.href = `${url}/`));
});
