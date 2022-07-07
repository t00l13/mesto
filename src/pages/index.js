import './index.css';

import { 
         validateObject,
         selectorObject,
         buttonEditProfile,
         buttonAddCard,
         popupProfileInputs,
         popupEditProfile,
         popupAddCard,
         popupChangeAvatar,
         changeAvatarButton,
        } from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

// ФУНКЦИИ
//функция показа картинки
function showFunction(title, link) {
  popupWithImage.open(title, link);
}

function handleLikeClick(id, isLiked, card) {
  if (isLiked) {
    api.dislikedCard(id)
      .then((data) => {
        card.setLikes(data.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api.likedCard(id)
      .then((data) => {
        card.setLikes(data.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function handleTrashClick(id, card) {
  popupWithConfirm.setSubmitAction(() => handlePopupConfirm(id, card))
  popupWithConfirm.open();
}

function handlePopupConfirm(id, card) {
  api.deleteCard(id)
  .then(() => {
    card.removeCard();
    popupWithConfirm.close();
  })
  .catch((err) => {
    console.log(err);
  })
}

//функция отправки редактирования профиля
function handlePopupProfile(inputsData) {
  popupWithProfile.renderSaving(true);

  api.saveUserChanges(inputsData)
  .then((data) => {
    userInfo.setUserInfo(data);
    popupWithProfile.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupWithProfile.renderSaving(false);
  })
}

function handlePopupAddCard(inputsData) {
  popupWithCard.renderSaving(true);

  api.postNewCard(inputsData)
  .then((data) => {
    cardList.addItemPrepend(createCard(data, data.owner._id));
    popupWithCard.close();
  })
  .catch ((err) => {
    console.log(err);
  })
  .finally(() => {
    popupWithCard.renderSaving(false);
  })
}

function handlePopupChangeAvatar(inputsData) {
  popupWithChangeAvatar.renderSaving(true);

  api.changeAvatar(inputsData)
  .then((data) => {
    userInfo.setUserInfo(data);
    popupWithChangeAvatar.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupWithChangeAvatar.renderSaving(false);
  })
}


function handleTextInput() {
  const userData = userInfo.getUserInfo();
  popupProfileInputs.forEach(input => {
    input.value = userData[input.name];
  });
}

function createCard(dataCard, id) {
  const card = new Card ({
    data: dataCard,
    showFunction,
    handleLikeClick,
    handleTrashClick,
  }, selectorObject.cardId,
  id);

  return card.generateCard();
} 

//СЛУШАТЕЛИ

buttonEditProfile.addEventListener('click', () => {
  popupWithProfile.open();
  handleTextInput();
  validFormPopupEditProfile.deleteValidationError();
});

buttonAddCard.addEventListener('click', () => {
  popupWithCard.open();
  validFormPopupAddPhoto.deleteValidationError();
});

changeAvatarButton.addEventListener('click', () => {
  popupWithChangeAvatar.open();
  validFormPopupAddPhoto.deleteValidationError();
})

const cardList = new Section(
  {
    render: (cardItem, id) => {
      cardList.addItem(createCard(cardItem, id));
    },
  },
  selectorObject.elementSelector
);

const popupWithImage = new PopupWithImage(selectorObject.popupImageSelector);
popupWithImage.setEventListeners();

const popupWithProfile = new PopupWithForm(selectorObject.popupProfileSelector, handlePopupProfile);
popupWithProfile.setEventListeners();

const popupWithCard = new PopupWithForm(selectorObject.popupAddCardSelector, handlePopupAddCard);
popupWithCard.setEventListeners();

const popupWithChangeAvatar = new PopupWithForm(selectorObject.popupChangeAvatarSelector, handlePopupChangeAvatar);
popupWithChangeAvatar.setEventListeners();

const popupWithConfirm = new PopupWithConfirm(selectorObject.popupConfirmSelector);
popupWithConfirm.setEventListeners();


//ВКЛ ВАЛИДАЦИЯ НА ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ
const validFormPopupAddPhoto = new FormValidator(validateObject, popupAddCard);
validFormPopupAddPhoto.enableValidation();
//ВКЛ ВАЛИДАЦИЯ НА ПОПАП НА РЕДАКТИРОВАНИЕ КАРТОЧКИ
const validFormPopupEditProfile = new FormValidator(validateObject, popupEditProfile);
validFormPopupEditProfile.enableValidation();

const validFormPopupChangeAvatar = new FormValidator(validateObject, popupChangeAvatar);
validFormPopupChangeAvatar.enableValidation();


const userInfo = new UserInfo({
  selectorName: selectorObject.profileNameSelector,
  selectorJob: selectorObject.profileJobSelector,
  selectorAvatar: selectorObject.avatarSelector,
});

const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45',
  headers:{
    authorization:'fcd67938-a1e9-408c-8c74-faa990c9d125',
    'Content-Type' : 'application/json'
  }
});

Promise.all([
  api.getUserData(),
  api.getInitialCards()
])
.then((values) => {
  userInfo.setUserInfo(values[0])
  cardList.renderItems(values[1], values[0]._id);
})
.catch((err) => {
  console.log(err);
})
