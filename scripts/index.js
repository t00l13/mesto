
const popup = document.querySelector('.popup');// попап
const popups = document.querySelectorAll('.popup');//все попапы

const gallery = document.querySelector('.gallery__list');//галлерея карточек
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


//
//* СОЗДАНИЕ ГАЛЛЕРЕИ *//
//

const createCardElement = ({name,link}) => {
  const newCard=cardTemplate.querySelector('.card').cloneNode(true);      //* карточка(template) *//

  const image = newCard.querySelector('.card__image');
  image.alt = name;
  image.src = link;

  const title = newCard.querySelector('.card__title');
  title.textContent= name;

  const trash = newCard.querySelector('.card__btn-trash');
  trash.addEventListener('click', function (evt) {          //*Удаление карточки*
    evt.target.closest('.card');
    newCard.remove();
  });

  const like = newCard.querySelector('.card__btn-like');
  like.addEventListener('click', function (evt) {           //* ЛАЙК*//
    evt.target.classList.toggle('card__btn-like_active');
  });
  image.addEventListener('click', function () {
    openPopup(popupShowPhoto);
    photoTitle.textContent=title.textContent;
    photoImage.src = image.src;
    photoImage.alt = image.alt;
  });


  return newCard;
}

const loadCards = (cards)=> (
  cards.reverse().forEach((card) => gallery.append(createCardElement(card)))       //* рендеринг карточек из массива *//
);

//
//* ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧКИ*//
//
const addCard = ( )=>{
  const addNewCard = {
    name: titleInput.value,
    link: linkInput.value
  };
  gallery.prepend(createCardElement(addNewCard));
};

//
//* ФУНКЦИОНАЛ ОТКРЫТИЯ И ЗАКРЫТИЯ ПОПАПА *//
//
const openPopup = (popup) => {
  popup.classList.add('popup_opened');                //открытие попапа
};
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');       //заркрыие попапа
};
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);                            //закрытие попапа
    };
    if (evt.target.classList.contains('popup__btn-close')) {
      closePopup(popup);
    };
  })
});

//
//* ПОПАП ПРИ ОТКРЫТИИ *//
//
const handleOpenPopupEdit = () =>{
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile);
};
const handleOpenPopupAdd = () =>{
  openPopup(popupAddPhoto);
  formPopupAdd.reset();
};

//
//* ОТПРАВКА ФОРМЫ В ПОПАПЕ РЕДАКТИРОВАНИЯ *//
//
const handleSubmitFormEdit = (evt)=>{
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

//
//* ОТПРАВКА ФОРМЫ В ПОПАПЕ ДОБАВЛЕНИЯ КАРТОЧКИ *//
//
const handleSubmitFormAdd = (evt) =>{
  evt.preventDefault();
  addCard();
  titleInput.value='';
  linkInput.value='';
  closePopup(popupAddPhoto);
};

//
//* СЛУШАТЕЛИ *//
//

formEditElement.addEventListener('submit', handleSubmitFormEdit);
formAddElement.addEventListener('submit', handleSubmitFormAdd);

buttonEditProfile.addEventListener('click', handleOpenPopupEdit);
buttonAddCard.addEventListener('click', handleOpenPopupAdd);



loadCards(initialCards);
