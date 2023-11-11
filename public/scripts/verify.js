import { apiRegister } from './register.js';

const submitFn = { register: apiRegister };

// Get user and flow
const flowInput = document.getElementById('flow');
const flow = flowInput.value;
flowInput.remove();

const userInput = document.getElementById('user');
const user = JSON.parse(userInput.value);
userInput.remove();

const send = async () => {
  // Send notification to verify user
  try {
    const response = await fetch('/api/verify/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  } catch (error) {
    document.getElementById('error').style.display = 'block';
  }
};

const check = async (event) => {
  const code = document.getElementById('code').value;

  event.preventDefault();
  // Check verification code input
  try {
    const response = await fetch('/api/verify/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: { code },
    });
    submitFn[flow]();
    window.location = '/';
  } catch (error) {
    document.getElementById('error').style.display = 'block';
  }
};

document.getElementById('verify-form').addEventListener('submit', check);

send();
