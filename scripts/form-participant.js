const categoryForm = document.querySelector('#pick-category');
const categoryRadios = document.querySelectorAll('.radio-button');
const categotySubmitBtn = document.querySelector('#category-submit');

const formRadios = document.querySelectorAll('.form__radio-unit');

if (categoryForm) {
  let currentChoice;

  categoryRadios.forEach((radio) =>
    radio.addEventListener('click', () => {
      const radioInp = radio.querySelector('.form__radio');
      if (radioInp) {
        categoryRadios.forEach((r) => switchCategoryRadio(r, radioInp.value));
        currentChoice = radioInp.value;
        categotySubmitBtn.classList.add('form__control_active');
      }
    })
  );

  categoryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!currentChoice) {
      return;
    }
    switch (currentChoice) {
      case 'cafe':
        location.href = '../cafe-form.html';
        break;
      case 'master-class':
        location.href = '../master-class-form.html';
        break;
      case 'party':
        location.href = '../party-form.html';
        break;
      case 'other':
        location.href = '../other-form.html';
        break;
    }
  });
}

formRadios.forEach((radio) =>
  radio.addEventListener('click', (e) => {
    switchRadio(e.target.closest('.form__radio'));
  })
);

const switchRadio = (radio) => {
  if (radio) {
    formRadios.forEach((formRadio) => {
      const radioInp = formRadio.querySelector('.form__radio');
      const radioIcon = formRadio.querySelector('.form__radio-icon');
      if (radio.value === radioInp.value) {
        radioIcon.classList.add('form__radio-icon_checked');
      } else {
        radioIcon.classList.remove('form__radio-icon_checked');
      }
    });
  }
};

const switchCategoryRadio = (radio, value) => {
  const radioVal = radio.querySelector('.form__radio').value;
  const checkerIcon = radio.querySelector('.form-input__checker');

  if (checkerIcon) {
    if (radioVal === value) {
      checkerIcon.classList.add('form-input__checker_checked');
      radio.classList.add('form-input_active');
    } else {
      checkerIcon.classList.remove('form-input__checker_checked');
      radio.classList.remove('form-input_active');
    }
  }
};
