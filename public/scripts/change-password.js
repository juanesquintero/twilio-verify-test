import { showError, checkResponse } from './utils.js';

const validConfirmation = () => {
  const areEqual =
    document.getElementById('new-password').value ===
    document.getElementById('new-password-confirmation').value;

  if (!areEqual) {
    showError('New Password Confirmation are NOT equal');
  }

  return areEqual;
};

const changePassword = async (event) => {
  event.preventDefault();

  const currentUser = globalUser ? JSON.parse(globalUser) : {};

  const current = document.getElementById('current-password').value;
  const newOne = document.getElementById('new-password').value;
  const confirmation = document.getElementById(
    'new-password-confirmation'
  ).value;

  if (!validConfirmation()) return;

  const user = { id: currentUser.id, name: currentUser.name };

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
    const msg = 'Your password has been changed!';
    window.location = `/profile?msg=${msg}`;
  } catch (error) {
    showError(error);
  }
};

const changePasswordForm = document.getElementById('change-password-form');

if (changePasswordForm) {
  if (globalTwoFA !== 'false') {
    changePasswordForm.action = '/verify/change-password';
    changePasswordForm.addEventListener('submit', function (event) {
      if (!validConfirmation()) return;
      this.submit();
    });
  } else {
    changePasswordForm.addEventListener('submit', changePassword);
  }
}
