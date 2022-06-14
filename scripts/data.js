//массив карточек

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
      name: 'ТУ',
      link: 'https://i.ibb.co/ySQmBPn/pic6.png'
    },
    {
      name: 'БО',
      link: 'https://i.ibb.co/7ps89XS/pic5.png'
    },
    {
      name: 'РА',
      link: 'https://i.ibb.co/pwHXYXj/pic4.png'
    },
    {
      name: 'У',
      link: 'https://i.ibb.co/9qjxThd/pic3.png'
    },
    {
      name: 'ОЧ',
      link: 'https://i.ibb.co/Gc0Ympr/pic2.png'
    },
    {
      name: 'Х',
      link: 'https://i.ibb.co/rxMXPKR/pic1.png'
    }
  ];

  //
//* ОБЪЕКТ ДЛЯ ВАЛИДАЦИИ ФОРМ  *
//
const validateObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn-save',
    inactiveButtonClass: 'popup__btn-save_disable',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  };



const popups = document.querySelectorAll('.popup');//все попапы

const placesWrap = document.querySelector('.gallery__list');//галлерея карточек
const cardTemplate = document.querySelector('.card-template').content;//контейнер карточки


const buttonEditProfile = document.querySelector('.profile__button-edit');//кнопка edit
const buttonAddCard = document.querySelector('.profile__button-add');//кнопка добавить
//const popupClose = document.querySelector('.popup__btn-close');//кнопка закрыть

const profileName = document.querySelector('.profile__name');//поле имени
const profileJob = document.querySelector('.profile__job');//поле профессии


const popupEditProfile = document.querySelector('.popup_type_edit-profile');//попап редактирования профиля
const popupAddPhoto = document.querySelector('.popup_type_add-photo');//попап добавления карточки
const popupShowPhoto = document.querySelector('.popup_photo');//попап увеличивания фото

const formPopupEdit = popupEditProfile.querySelector('.popup__form');//форма edit
const formPopupAdd = popupAddPhoto.querySelector('.popup__form');//форма add


const nameInput = document.querySelector('.popup__input_type_profile-name');//input имя
const jobInput = document.querySelector('.popup__input_type_profile-job');//input профессия
const titleInput = document.querySelector('.popup__input_type_card-title');//input название изображения
const linkInput = document.querySelector('.popup__input_type_card-link');//input ссылка изображение

const photoImage = popupShowPhoto.querySelector('.popup__photo');//фото в большом размере
const photoTitle = popupShowPhoto.querySelector('.popup__photo-title');//подпись к фото

const formEditElement = popupEditProfile.querySelector('.popup__form');//форма попапа редактирования
const formAddElement = popupAddPhoto.querySelector('.popup__form');//форма попапа добавления карточки

export {
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
};