import { showError, checkResponse } from './utils.js';

const register = async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;
  const phone = document.getElementById('phone').value;
  const twoFA = document.getElementById('2fa').checked;

  if (!twoFA) {
    apiRegister({ name, password, phone, twoFA: false });
  }
};

export const apiRegister = async (user) => {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(user),
    });
    checkResponse(response);
    window.location = '/';
  } catch (error) {
    showError(error);
  }
};

const registerForm = document.getElementById('register-form');

if (registerForm) {
  registerForm.addEventListener('submit', register);

  document.getElementById('2fa').addEventListener('change', function () {
    var phoneInput = document.getElementById('phone');
    phoneInput.required = this.checked;
    if (this.checked) {
      registerForm.addEventListener('submit', function (event) {
        this.submit();
      });
      registerForm.action = 'verify/register';
    } else {
      registerForm.addEventListener('submit', register);
    }
  });
}
