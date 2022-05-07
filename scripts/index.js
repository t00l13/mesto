
const popup=document.querySelector('.popup');// попап
const popups=document.querySelectorAll('.popup');//все попапы

const gallery=document.querySelector('.gallery__list');//галлерея карточек
const cardTemplate=document.querySelector('#card-template').content;//контейнер карточки

const buttonEdit=document.querySelector('.profile__button-edit');//кнопка edit
const buttonAddCard=document.querySelector('.profile__button-add');//кнопка добавить
const popupClose= document.querySelector('.popup__btn-close');//кнопка закрыть

const profileName=document.querySelector('.profile__name');//поле имени
const profileJob=document.querySelector('.profile__job');//поле профессии


const popupEdit=document.querySelector('#popup-edit-profile');//попап редактирования профиля
const popupAdd=document.querySelector('#popup-add-photo');//попап добавления карточки
const popupShowPhoto=document.querySelector('#popup-show-photo');//попап увеличивания фото

const formPopupEdit=document.querySelector('.popup__form');//форма edit
const formPopupAdd=document.querySelector('.popup__form');//форма add

let nameInput=document.querySelector('#name');//input имя
let jobInput=document.querySelector('#job');//input профессия
let titleInput=document.querySelector('#title');//input название изображения
let linkInput=document.querySelector('#link');//input ссылка изображение

let photoImage=popupShowPhoto.querySelector('.popup_photo_img');//фото в большом размере
let photoTitle=popupShowPhoto.querySelector('.popup_photo_title');//подпись к фото

let formEditElement=popupEdit.querySelector('.popup__form');//форма попапа редактирования
let formAddElement=popupAdd.querySelector('.popup__form');//форма попапа добавления карточки


//
//* СОЗДАНИЕ ГАЛЛЕРЕИ *//
//

const createCardElement = ({name,link}) => {
  const newCard=cardTemplate.querySelector('.card').cloneNode(true);      //* карточка(template) *//

  const image=newCard.querySelector('.card__image');
  image.alt = name;
  image.src = link;

  const title=newCard.querySelector('.card__title');
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
    photoImage.src=image.src;
    photoImage.alt=image.alt;
    console.log('asd');
  });


  return newCard;
}

const loadCards =(cards)=> (
  cards.reverse().forEach((card)=> gallery.append(createCardElement(card)))       //* рендеринг карточек из массива *//
);




//
//* ФУНКЦИЯ УДАЛЕНИЯ КАРТОЧКИ*//
//

//
//* ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧКИ*//
//
const addCard =()=>{
  const addNewCard ={
    name: titleInput.value,
    link: linkInput.value
  };
  gallery.prepend(createCardElement(addNewCard));
};

//
//* ФУНКЦИОНАЛ ОТКРЫТИЯ И ЗАКРЫТИЯ ПОПАПА *//
//
const openPopup = (popup) =>{
  popup.classList.add('popup_opened');                //открытие попапа
};
const closePopup = (popup) =>{
  popup.classList.remove('popup_opened');             //заркрыие попапа
};
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);                                      //закрытие попапа
    };
    if (evt.target.classList.contains('popup__btn-close')) {
      closePopup(popup);
    };
  })
});

//
//* ПОПАП ПРИ ОТКРЫТИИ *//
//
const openPopupEdit = () =>{
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
};
const openPopupAdd = () =>{
  formPopupAdd.reset();
  openPopup(popupAdd);
};

//
//* ОТПРАВКА ФОРМЫ В ПОПАПЕ РЕДАКТИРОВАНИЯ *//
//
const formEditSubmitHandler=(evt)=>{
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
};

//
//* ОТПРАВКА ФОРМЫ В ПОПАПЕ ДОБАВЛЕНИЯ КАРТОЧКИ *//
//
const formAddSubmitHandler=(evt)=>{
  evt.preventDefault();
  addCard();
  titleInput.value='';
  linkInput.value='';
  closePopup(popupAdd);

};


//
//* СЛУШАТЕЛИ *//
//

formEditElement.addEventListener('submit', formEditSubmitHandler);
formAddElement.addEventListener('submit', formAddSubmitHandler);

buttonEdit.addEventListener('click', openPopupEdit);
buttonAddCard.addEventListener('click', openPopupAdd);

popupClose.addEventListener('click', closePopup);


loadCards(initialCards);
