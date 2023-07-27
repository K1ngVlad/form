const form = document.forms.register;

const passwordEye = document.getElementById('passwordEye');
const repeatPasswordEye = document.getElementById('repeatPasswordEye');

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
    const formContent = form.querySelector('.formContent');
    const checkContent = form.querySelector('.checkContent');
    formContent.classList.add('contentExit');
    checkContent.classList.add('checkEnter');
  }
});

document.documentElement.addEventListener('mousemove', (e) => {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    return;
  }

  const x = e.screenX;
  const y = e.screenY;
  const height = document.body.clientHeight;
  const width = document.body.clientWidth;
  const xTranslate = (width / 2 - x) / 25;
  const yTranslate = (height / 2 - y) / 25;
  document.documentElement.style.setProperty(
    '--x-translate',
    `${xTranslate}px`
  );
  document.documentElement.style.setProperty(
    '--y-translate',
    `${yTranslate}px`
  );
});

passwordEye.addEventListener('click', (e) => {
  if (password.type === 'password') {
    password.type = 'text';
    e.target.src = 'assets/eye-off.svg';
  } else {
    password.type = 'password';
    e.target.src = 'assets/eye.svg';
  }
});

repeatPasswordEye.addEventListener('click', (e) => {
  if (repeat_password.type === 'password') {
    repeat_password.type = 'text';
    e.target.src = 'assets/eye-off.svg';
  } else {
    repeat_password.type = 'password';
    e.target.src = 'assets/eye.svg';
  }
});
