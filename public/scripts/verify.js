import { showError, checkResponse } from './utils.js';
import { apiRegister } from './register.js';

let flow;
let user = {};

const getData = () => {
  // Get flow
  const routes = window.location.pathname.split('/');
  flow = routes.pop();

  // Get user
  user = globalUser ? JSON.parse(globalUser) : {};
};

// Send notification to verify user
const send = async () => {
  try {
    const response = await fetch('/api/verify/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone: user.phone }),
    });
    checkResponse(response);
  } catch (error) {
    showError(error);
  }
};

// Check verification otpCode input
const check = async (event) => {
  event.preventDefault();
  const otpCode = document.getElementById('otpCode').value;

  try {
    const response = await fetch('/api/verify/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ otpCode, phone: user.phone }),
    });

    checkResponse(response);

    next();
  } catch (error) {
    showError(error);
  }
};

const next = () => {
  switch (flow) {
    case 'register':
      apiRegister(user);
      break;
    case 'login':
      window.location = '/profile';
      break;
    case 'change-password':
      // changePassword(user);
      break;
    default:
      break;
  }
};

document.getElementById('verify-form').addEventListener('submit', check);

getData();

send();
