const sliderParkButton = document.querySelector('.hedonismfest__button_slider_park');
const sliderLadyButton = document.querySelector('.hedonismfest__button_slider_lady');
const sliderDrinkButton = document.querySelector('.hedonismfest__button_slider_drink');
const sliderExhibitionButton = document.querySelector('.hedonismfest__button_slider_exhibition');
const sliderTeamButton = document.querySelector('.hedonismfest__button_slider_team');

const sliderButtons = document.querySelectorAll('.hedonismfest__button');

const hedonismfestImage = document.querySelector('.hedonismfest__image');

function setImage(imageLinkValue, altValue) {
  hedonismfestImage.setAttribute('src', imageLinkValue);
  hedonismfestImage.setAttribute('alt', altValue);
}

function defaultButtonColor(buttons) {
  buttons.forEach(function (item) {
    removeActiveColorButton(item);
    addNonActiveColorButton(item);
  });
}

function addActiveColorButton(button) {
  button.classList.add('hedonismfest__button_status_active');
}

function removeActiveColorButton(button) {
  button.classList.remove('hedonismfest__button_status_active');
}

function addNonActiveColorButton(button) {
  button.classList.add('hedonismfest__button_status_non-active');
}

function setButtonColor(button) {
  defaultButtonColor(sliderButtons);
  addActiveColorButton(button);
}

sliderParkButton.addEventListener('click', function (event) {
  setImage("./images/fest-park.svg", "парк");
  setButtonColor(event.target);
});

sliderLadyButton.addEventListener('click', function (event) {
  setImage("./images/fest-lady.svg", "девушка");
  setButtonColor(event.target);
});

sliderDrinkButton.addEventListener('click', function (event) {
  setImage("./images/fest-drink.svg", "напитки");
  setButtonColor(event.target);
});

sliderExhibitionButton.addEventListener('click', function (event) {
  setImage("./images/fest-exhibition.svg", "выставка");
  setButtonColor(event.target);
});

sliderTeamButton.addEventListener('click', function (event) {
  setImage("./images/fest-team.svg", "компания");
  setButtonColor(event.target);
});

function initPage(button) {
  addActiveColorButton(button);
}

initPage(sliderLadyButton);

const popupMenu = document.querySelector('.popup_type_menu')
const menuButton = document.querySelector('.header__menu-button')
const changeCityButton = popupMenu.querySelector('.popup__change-city-button')
const popupChangeCity = document.querySelector('.popup_type_change-city')
const backButton = popupChangeCity.querySelector('.popup__back-button')
const formChangeCity = popupChangeCity.querySelector('.popup__change-city-form')
const labelCity = formChangeCity.querySelectorAll('.popup__form-radio')
const cityName = popupMenu.querySelector('.popup__city-name')
const openDonateButtonInPopup = popupMenu.querySelector('.popup__open-donate-button')
const openDonateButtonInHeader = document.querySelector('.header__donate-button')
const popupDonate = document.querySelector('.popup_type_donate')
const closeDonateButton = popupDonate.querySelector('.popup__donate-close-button')
const sumOfMoneyButton = popupDonate.querySelectorAll('.popup__sum-of-money')
const inputSum = popupDonate.querySelector('.popup__sum-of-money-input')
const header = document.querySelector('.header')
const closeFormBuyTicketsButton = document.querySelector('.popup__buy-tickets-close-button')
const popupBuyTickets = document.querySelector('.popup_type_buy-tickets')

function openPopup(popup) {
  popup.classList.add('popup_opened')
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

const eventsCards = document.querySelectorAll(".events__card");
eventsCards.forEach(element => {
  element.querySelector(".events__like-button").addEventListener("click", event => {
    event.target.classList.toggle("events__like-button_active");
  })
})

menuButton.addEventListener('click', function () {
  popupMenu.classList.toggle('popup_opened')
  if (popupChangeCity.classList.contains('popup_opened')) {
    closePopup(popupChangeCity);
    closePopup(popupMenu);
    getCheckedRadio()
  }
  if (popupDonate.classList.contains('popup_opened')) {
    closePopup(popupDonate)
    closePopup(popupMenu)
  }
})

changeCityButton.addEventListener('click', function () {
  closePopup(popupMenu);
  openPopup(popupChangeCity)
})

backButton.addEventListener('click', function () {
  openPopup(popupMenu);
  closePopup(popupChangeCity)
  getCheckedRadio()
})

function getCheckedRadio() {
  labelCity.forEach(function (item) {
    if (item.checked) {
      cityName.textContent = item.value;
    }
  })
}

openDonateButtonInPopup.addEventListener('click', function () {
  closePopup(popupMenu);
  openPopup(popupDonate)
})

openDonateButtonInHeader.addEventListener('click', function () {
  openPopup(popupDonate)
})

closeDonateButton.addEventListener('click', function () {
  closePopup(popupDonate)
})

closeFormBuyTicketsButton.addEventListener('click', function () {
  closePopup(popupBuyTickets)
})

sumOfMoneyButton.forEach(function (item) {
  item.addEventListener('click', function () {
    sumOfMoneyButton.forEach(function (item) {
      item.classList.remove('popup__sum-of-money_active')
    })
    item.classList.add('popup__sum-of-money_active')
  })
})

inputSum.addEventListener('click', function () {
  sumOfMoneyButton.forEach(function (item) {
    item.classList.remove('popup__sum-of-money_active')
  })
})

let prevScroll = window.scrollY;
let curScroll;

window.addEventListener('scroll', () => {
  curScroll = window.scrollY;
  let headerHidden = header.classList.contains('header_hidden');

  if (curScroll > prevScroll && !headerHidden) {
    header.classList.add('header_hidden');
  } else if (curScroll < prevScroll && headerHidden) {
    header.classList.remove('header_hidden');
  }

  prevScroll = curScroll;
});

const donateFormElement = document.querySelector('.popup__donate-form');
const donateSumFormInputElement = donateFormElement.querySelector('.popup__sum-of-money-input');
const emailDonateFormElement = donateFormElement.querySelector('.popup__email-form-donate');

donateFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  showDonateInfoInConsole(evt)
  closePopup(popupDonate);
  donateFormElement.reset();
});

function showDonateInfoInConsole(evt) {
  let elementsValues = {};
  let selectedSumElement = evt.target.querySelectorAll(".popup__sum-of-money_active");

  if (selectedSumElement.length > 0) {
    let donateSumFormSpanElement = selectedSumElement[0].getElementsByClassName('popup__sum-of-money-text')[0];
    elementsValues.sum = donateSumFormSpanElement.textContent;
  } else {
    elementsValues.sum = donateSumFormInputElement.value;
  }

  elementsValues.email = emailDonateFormElement.value;
  elementsValues.paymentMethod = donateFormElement.querySelector('[type="radio"]:checked').value;

  console.log(elementsValues);
}

const formBuyTickets = document.querySelector('.popup_type_buy-tickets');
const buttonMinus = formBuyTickets.querySelector('.tickets__minus');
const buttonPlus = formBuyTickets.querySelector('.tickets__plus');
const currentPrice = formBuyTickets.querySelector('.tickets__price');
const price = 500;
const quantity = formBuyTickets.querySelector('.tickets__quantity');
const emailFormBuyTickets = formBuyTickets.querySelector('.popup__email-form-buy-tickets');

function addPoint() {
  let point = quantity.value;
  quantity.value = parseInt(point) + 1;
  currentPrice.textContent = `${price * quantity.value} ₽`;
}

function reducePoint() {
  point = quantity.value;
  if (point > 1) {
    quantity.value = parseInt(point) - 1;
    currentPrice.textContent = `${price * quantity.value} ₽`;
  } else {
    quantity.value = parseInt(point);
  }
  return currentPrice.textContent;
}

quantity.addEventListener('change', (event) => {
  currentPrice.textContent = `${price * parseInt(event.target.value)} ₽`;
});

buttonPlus.addEventListener('click', addPoint);
buttonMinus.addEventListener('click', reducePoint);

const buttonBuyTickets = formBuyTickets.querySelector('.popup__donate-button');

function showInfoInConsole(evt) {
  evt.preventDefault();
  console.log('количество билетов: ' + quantity.value);
  console.log('сумма: ' + currentPrice.textContent);
  console.log('email: ' + emailFormBuyTickets.value);
  console.log('способ оплаты: ' + formBuyTickets.querySelector('[type="radio"]:checked').value);
  closePopup(popupBuyTickets);
}

buttonBuyTickets.addEventListener('click', showInfoInConsole);
