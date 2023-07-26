const form = document.forms.register;

const { username, email, password, repeat_password } = form;

let nonactiveTimer = false;

const addError = (input, text) => {
  const box = input.parentNode;
  const currentError = box.querySelector('.error');

  if (!currentError) {
    input.classList.remove('inputValid');
    input.classList.add('inputError');
    const error = document.createElement('span');
    error.classList.add('error');
    error.textContent = text;
    box.appendChild(error);
  }
};

const removeError = (input) => {
  const box = input.parentNode;
  const error = box.querySelector('.error');
  if (error) {
    input.classList.add('inputValid');
    input.classList.remove('inputError');
    error.classList.add('errorBack');
    setTimeout(() => {
      box.removeChild(error);
    }, 1000);
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (nonactiveTimer) return;
  nonactiveTimer = true;

  let valid = true;

  if (!username.value) {
    valid = false;
    addError(username, "Поле 'Имя' обязательно для заполнения");
  } else {
    removeError(username);
  }

  const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  if (!email.value.match(emailPattern)) {
    valid = false;
    addError(email, 'Введите корректный адрес электронной почты');
  } else {
    removeError(email);
  }

  if (password.value.length < 6) {
    valid = false;
    addError(password, "Поле 'Пароль' должно содержать не менее 6 символов");
  } else {
    removeError(password);
  }

  if (password.value !== repeat_password.value) {
    valid = false;
    addError(repeat_password, 'Пароли не совпадают');
  } else {
    removeError(repeat_password);
  }

  setTimeout(() => {
    nonactiveTimer = false;
  }, 1000);

  if (valid) {
    //отправка на сервер
  }
});
