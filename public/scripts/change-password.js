import { showError, checkResponse } from './utils.js';

let twoFA = globalTwoFA !== 'false'

const changePassword = async (event) => {
  event.preventDefault();

  const current = document.getElementById('current-password').value;
  const newOne = document.getElementById('new-password').value;
  const confirmation = document.getElementById(
    'new-password-confirmation'
  ).value;

  apiChangePassword({ current, newOne, confirmation });
};

export const apiChangePassword = async (body) => {
  try {
    const response = await fetch('/api/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(body),
    });
    checkResponse(response);
    window.location = '/profile';
  } catch (error) {
    showError(error);
  }
};

const changePasswordForm = document.getElementById('change-password-form');

if (changePasswordForm) {
  changePasswordForm.addEventListener('submit', changePassword);

  if (twoFA) {
    changePasswordForm.action = '/verify/change-password';
    changePasswordForm.addEventListener('submit', function (event) {
      this.submit();
    });
  }
}