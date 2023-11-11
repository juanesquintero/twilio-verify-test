export const checkResponse = (response) => {
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
};

export const showError = (error = '') => {
  const errorLbl = document.getElementById('error');
  errorLbl.style.display = 'block';
  errorLbl.innerHTML = errorLbl.innerHTML + `:  <small>(${error})</small>`;
};

export const getDOMValue = (id) => {
  const inputEl = document.getElementById(id);
  let value = null;
  if (inputEl) {
    value = inputEl.value;
    inputEl.remove();
  }
  return value;
};
