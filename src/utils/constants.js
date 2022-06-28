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
      name: 'Стич с лягушкой',
      link: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg'
    },
    {
      name: 'Стич с сердечкой',
      link: 'https://abrakadabra.fun/uploads/posts/2021-12/thumbs/1640681784_34-abrakadabra-fun-p-stich-zastavka-na-telefon-34.jpg'
    },
    {
      name: 'Толя и Настя',
      link: 'https://abrakadabra.fun/pic77.php?src=https://abrakadabra.fun/uploads/posts/2022-01/thumbs/1641835202_1-abrakadabra-fun-p-parnie-avi-stich-10.jpg&w=268&h=402&zc=1'
    },
    {
      name: 'Толя с майки',
      link: 'https://kartinkin.net/uploads/posts/2022-02/1645098154_3-kartinkin-net-p-kartinki-sticha-3.jpg'
    },
    {
      name: 'Стич со звездой',
      link: 'https://klike.net/uploads/posts/2020-06/1591514925_11.jpg'
    },
    {
      name: 'Стич хочет быть похожим на меня',
      link: 'https://avatarko.ru/img/kartinka/30/multfilm_29845.jpg'
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
    cardId: '.card-template',
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
