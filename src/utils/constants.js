const initialCards = [
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
    },
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
  ];

  const validateObject = {
      formSelector: '.popup__form',
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__btn-save',
      inactiveButtonClass: 'popup__btn-save_disable',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__input-error_active',
    };

  const selectorObject = {
    popupImageSelector: '.popup_photo',
    popupProfileSelector: '.popup_type_edit-profile',
    popupAddCardSelector: '.popup_type_add-photo',
    elementSelector : '.gallery__list',
    profileNameSelector : '.profile__name',
    profileJobSelector : '.profile__job',
    cardId: '#card',
  }
  const container = document.querySelector('.container');
  const buttonEditProfile = container.querySelector('.profile__button-edit');
  const buttonAddCard = container.querySelector('.profile__button-add');
  const popupEditProfile = document.querySelector('.popup_type_edit-profile');
  const popupProfileInputs = popupEditProfile.querySelectorAll('.popup__input');

  export {
    initialCards,
    validateObject,
    selectorObject,
    buttonAddCard,
    buttonEditProfile,
    popupProfileInputs,
  }
