const popupElement=document.querySelector('.popup');//весь попап
const editProfile=document.querySelector('.profile__button-edit');//кнопка edit
const profileName=document.querySelector('.profile__name');//поле имени
const profileJob=document.querySelector('.profile__job');//поле профессии
const popupClose=popupElement.querySelector('.popup__btn-close');//кнопка редактировать

let nameInput=document.querySelector('#name');//input имя
let jobInput=document.querySelector('#job');//input профессия
let formElement=document.querySelector('.popup__form');//форма попапа

function openPopup(){
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupElement.classList.add('popup_opened');
}

function closePopup(){
  popupElement.classList.remove('popup_opened');
}

function formSubmitHandler (evt){
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit',formSubmitHandler);
editProfile.addEventListener('click', openPopup);
popupClose.addEventListener('click',closePopup);
