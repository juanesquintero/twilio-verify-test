import { showError, checkResponse } from './utils.js';

const login = async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ name, password }),
    });

    const payload = await response.json();

    checkResponse(response);

    window.location = payload.redirect;
  } catch (error) {
    showError(error);
  }
};

document.getElementById('login-button').addEventListener('click', login);
