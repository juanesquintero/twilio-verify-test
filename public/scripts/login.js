import { showError, checkResponse } from './utils.js';

const login = async function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;

  const credentials = { name, password };

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(credentials),
    });

    checkResponse(response);

    const payload = await response.json();

    if (payload.redirect.includes('verify')) {
      this.action = payload.redirect;
      document.getElementById('phone').value = payload.phone;
      this.submit();
      return;
    }

    window.location = payload.redirect;
  } catch (error) {
    showError(error);
  }
};

document.getElementById('login-form').addEventListener('submit', login);
