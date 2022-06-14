import {
  initialCards,
  validateObject,
  popups,
  placesWrap,
  cardTemplate,
  buttonEditProfile,
  buttonAddCard,
  profileName,
  profileJob,
  popupEditProfile,
  popupAddPhoto,
  popupShowPhoto,
  formPopupEdit,
  formPopupAdd,
  nameInput,
  jobInput,
  titleInput,
  linkInput,
  photoImage,
  photoTitle,
  formEditElement,
  formAddElement,
} from './data.js';

import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';


//* ФУНКЦИЯ ПОКАЗА ИЗОБРАЖЕНИЯ*//
//
function showPopupImage(name, link) {
  openPopup(popupShowPhoto);
  photoTitle.textContent = name;
  photoImage.src = link;
  photoImage.alt = name;
}

//
//* ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧКИ*//
//
function handleAddCard(evt) {
  const NewCard = {
    name: titleInput.value,
    link: linkInput.value
  };

  placesWrap.prepend(createCard(NewCard));

}

//
//* ФУНКЦИЯ СОЗДАНИЯ НОВОЙ КАРТОЧКИ */
//
function createCard(item){

  return new Card(item, '#card', showPopupImage).generateCard();
}


//
//* ФУНКЦИОНАЛ ОТКРЫТИЯ И ЗАКРЫТИЯ ПОПАПА *//
//
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscapeDown);           //открытие попапа
};
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscapeDown);     //заркрыие попапа
};
// закрытие попапа через клик по области и по кнопке btn-close
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__btn-close')) {    //закрытие попапа
      closePopup(popup);
    };
  });
});

// * ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПА ЧЕРЕЗ ESCAPE *
function handleEscapeDown(evt) {
  //если нажата клавиша esc
  if (evt.key === 'Escape') {
    //вызов функции closePopup
    closePopup(document.querySelector('.popup_opened'));
  }
}

//
//* ПОПАП ПРИ ОТКРЫТИИ *//
//
const handleOpenPopupEdit = () => {
  nameInput.value = profileName.textContent;
  //очистка валидации попапа при открытии
  validFormPopupEditProfile.deleteValidationError();
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile);
};
const handleOpenPopupAdd = () => {
  openPopup(popupAddPhoto);
  //очистка валидации попапа при открытии
  validFormPopupAddPhoto.deleteValidationError();
  formPopupAdd.reset();
};

//
//* ОТПРАВКА ФОРМЫ В ПОПАПЕ РЕДАКТИРОВАНИЯ *//
//
const handleSubmitFormEdit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

//
//* ОТПРАВКА ФОРМЫ В ПОПАПЕ ДОБАВЛЕНИЯ КАРТОЧКИ *//
//
const handleSubmitFormAdd = (evt) => {
  evt.preventDefault();
  handleAddCard(); //добавление карточки
  formPopupAdd.reset();  //очистка инпутов через reset
  closePopup(popupAddPhoto); //закрытие попапа
};


//
//* СЛУШАТЕЛИ *//
//

formEditElement.addEventListener('submit', handleSubmitFormEdit);
formAddElement.addEventListener('submit', handleSubmitFormAdd);

buttonEditProfile.addEventListener('click', handleOpenPopupEdit);
buttonAddCard.addEventListener('click', handleOpenPopupAdd);


initialCards.forEach(item => {
  placesWrap.prepend(createCard(item));
})

//ВКЛ ВАЛИДАЦИЯ НА ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ
const validFormPopupAddPhoto = new FormValidator(validateObject, popupAddPhoto);
validFormPopupAddPhoto.enableValidation();
//ВКЛ ВАЛИДАЦИЯ НА ПОПАП НА РЕДАКТИРОВАНИЕ КАРТОЧКИ
const validFormPopupEditProfile = new FormValidator(validateObject, popupEditProfile);
validFormPopupEditProfile.enableValidation();

