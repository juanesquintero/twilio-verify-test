import { showError, checkResponse } from './utils.js';
import { apiRegister } from './register.js';

const submitFn = { register: apiRegister };

// Get user and flow
const flowInput = document.getElementById('flow');
const userInput = document.getElementById('user');
const flow = flowInput.value;
const user = JSON.parse(userInput.value);
flowInput.remove();
userInput.remove();

// Send notification to verify user
const send = async () => {
  try {
    const response = await fetch('/api/verify/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    checkResponse(response);
  } catch (error) {
    showError(error);
  }
};

// Check verification code input
const check = async (event) => {
  event.preventDefault();
  const code = document.getElementById('code').value;

  try {
    const response = await fetch('/api/verify/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, phone: user?.phone }),
    });

    checkResponse(response);

    const body = await response.json();
    
    user.factor = {
      type: 'push',
      sid: body?.verification?.sid,
    };

    submitFn[flow](user);
  } catch (error) {
    showError(error);
  }
};

document.getElementById('verify-form').addEventListener('submit', check);

send();
