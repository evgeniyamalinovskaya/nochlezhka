const digitsReg = /^\d+$/;
const phoneReg = /\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}/;

document.querySelector('.form__form').addEventListener('submit', (e) => {
  let errors;

  const formContainers = [...e.target.querySelectorAll('.form__input-container'), ...e.target.querySelectorAll('.form__labeled-container')];

  let formUnits = [];
  formContainers.forEach((container) => {
    formUnits = [...formUnits, ...container.querySelectorAll('.form__unit')];
  });

  formUnits.forEach((unit) => {
    const field = unit.querySelector('.form__field');

    if (!field.value) {
      errors = true;
      const label = unit.querySelector('.form__label').textContent;
      writeError(unit, `поле '${label}' обязательно для заполнения`);
    }

    if (field.type === 'tel') {
      errors |= !validatePhone(field);
    }
  });

  if (errors) {
    e.preventDefault();
  }
});

const writeError = (unit, message) => {
  const errSpan = unit.querySelector('.form__error');
  errSpan.textContent = message;
  errSpan.classList.add('form__error_visible');
  unit.querySelector('.form__field').classList.add('form__field_error');
};

const clearErrors = (target) => {
  const errorField = target.parentElement.querySelector('.form__error');
  // Проверка на contains не обязательно, но немного разгрузит процессор
  if (errorField.classList.contains('form__error_visible')) {
    target.parentElement.querySelector('.form__error').classList.remove('form__error_visible');
    target.parentElement.querySelector('.form__field').classList.remove('form__field_error');
  }
};

const formatPhone = (event, field) => {
  // Пустая data ввода не интересует, скорее всего это delete или backspace
  if (!event.data) {
    return;
  }

  const digits = field.value.split('').filter((s) => digitsReg.test(s));

  let formatted = '+';

  digits.forEach((digit, idx) => {
    if (idx > 10) {
      return;
    }

    formatted += digit;

    if (idx === 0) {
      formatted += ' (';
    }
    if (idx === 3) {
      formatted += ') ';
    }
    if (idx === 6 || idx === 8) {
      formatted += '-';
    }
  });

  field.value = formatted;
};

const validatePhone = (field) => {
  if (!phoneReg.test(field.value)) {
    writeError(field.parentElement, `укажите телефон в формате +X (XXX) XXX-XX-XX`);
    return false;
  }

  return true;
};
