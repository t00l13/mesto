

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
    popupConfirmSelector: '.popup_type_confirm',
    popupChangeAvatarSelector: '.popup_type_change-avatar',
    elementSelector : '.gallery__list',
    profileNameSelector : '.profile__name',
    profileJobSelector : '.profile__job',
    cardId: '#card',
    trashCard: '.card__btn-trash',
    avatarSelector: '.profile__avatar',
  }
  const container = document.querySelector('.container');
  const buttonEditProfile = container.querySelector('.profile__button-edit');
  const buttonAddCard = container.querySelector('.profile__button-add');
  const popupEditProfile = document.querySelector('.popup_type_edit-profile');
  const popupAddCard = document.querySelector('.popup_type_add-photo');
  const popupChangeAvatar = document.querySelector('.popup_type_change-avatar');
  const popupProfileInputs = popupEditProfile.querySelectorAll('.popup__input');
  const changeAvatarButton = document.querySelector('.profile__change-btn')

  export {
    validateObject,
    selectorObject,
    buttonAddCard,
    buttonEditProfile,
    popupProfileInputs,
    popupEditProfile,
    popupAddCard,
    popupChangeAvatar,
    changeAvatarButton
  }
