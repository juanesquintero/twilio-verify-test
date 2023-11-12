import { showError, checkResponse } from './utils.js';

const changePassword = async (event) => {
  event.preventDefault();

  let user = globalUser ? JSON.parse(globalUser) : {};

  const current = document.getElementById('current-password').value;
  const newOne = document.getElementById('new-password').value;
  const confirmation = document.getElementById(
    'new-password-confirmation'
  ).value;

  if (newOne !== confirmation) {
    showError('New Password Confirmation are NOT equal');
    return;
  }

  user = { id: user.id, name: user.name };

  apiChangePassword({ user, current, newOne, confirmation });
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
  if (globalTwoFA !== 'false') {
    changePasswordForm.action = '/verify/change-password';
    changePasswordForm.addEventListener('submit', function (event) {
      this.submit();
    });
  }
}
