import './index.css';

import { initialCards, validateObject, selectorObject, buttonEditProfile, buttonAddCard, popupProfileInputs } from '../utils/constants.js';

import Card from '../components/Card.js"';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

// ФУНКЦИИ
//функция показа картинки
function handleCardClick(title,link) {
  popupWithImage.open(title, link);
}

//функция отправки редактирования профиля
function handlePopupProfile(inputsData) {
  userInfo.setUserInfo(inputsData);
  popupFormProfile.close();
}

function handleTextInput() {
  const userData = userInfo.getUserInfo();
  popupProfileInputs.forEach(input => {
    input.value = userData[input.name];
  });
}

function createCard(dataCard) {
  const card = new Card ({data: dataCard, handleCardClick}, selectorObject.cardId);
  const newCard = card.generateCard();

  return newCard;
}

function handlePopupAddCard(inputsData) {
  cardList.addItem(createCard(inputsData));
  popupFormAddCard.close();
}

//СЛУШАТЕЛИ

buttonEditProfile.addEventListener('click', () => {
  popupFormProfile.open();
  handleTextInput();
  validFormPopupEditProfile.deleteValidationError();
});

buttonAddCard.addEventListener('click', () => {
  popupFormAddCard();
  validFormPopupAddPhoto.deleteValidationError();
})

const cardList = new Section(
  {
    items:initialCards,
    render: (cardItem) => {
      cardList.addItem(createCard(cardItem));
    },
  },
  selectorObject.elementSelector
);
cardList.renderItems();

const popupWithImage = new PopupWithImage(selectorObject.popupImageSelector);
popupWithImage.setEventListeners();

const popupWithProfile = new PopupWithForm(selectorObject.popupProfileSelector, handlePopupProfile);
popupFormProfile.setEventListeners();

const popupFormAddCard = new PopupWithForm(selectorObject.popupAddCardSelector,handlePopupAddCard);
popupFormAddCard.setEventListeners();


//ВКЛ ВАЛИДАЦИЯ НА ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ
const validFormPopupAddPhoto = new FormValidator(validateObject, popupAddPhoto);
validFormPopupAddPhoto.enableValidation();
//ВКЛ ВАЛИДАЦИЯ НА ПОПАП НА РЕДАКТИРОВАНИЕ КАРТОЧКИ
const validFormPopupEditProfile = new FormValidator(validateObject, popupEditProfile);
validFormPopupEditProfile.enableValidation();


const userInfo = new UserInfo({
  selectorName: selectorObject.profileNameSelector,
  selecotrJob: selectorObject.profileJobSelector
});
