const register = async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;
  const phone = document.getElementById('phone').value;
  const twoFA = document.getElementById('2fa').checked;

  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ name, password, phone, twoFA }),
    });

    window.location = '/';
  } catch (error) {
    document.getElementById('error').style.display = 'block';
  }
};

document.getElementById('register-form').addEventListener('submit', register);

document.getElementById('2fa').addEventListener('change', function () {
  var phoneInput = document.getElementById('phone');
  phoneInput.required = this.checked;
});
