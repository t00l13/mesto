const popupElement=document.querySelector('.popup');//весь попап
const editProfile=document.querySelector('.profile__button-edit');//кнопка edit
const profileName=document.querySelector('.profile__name');//поле имени
const profileJob=document.querySelector('.profile__job');//поле профессии
const popupClose=popupElement.querySelector('.popup__btn-close');//кнопка редактировать
const popupSave=popupElement.querySelector('.popup__btn-save');// кнопка сохранить

let nameInput=document.querySelector('#name');//input имя
let jobInput=document.querySelector('#job');//input профессия

function openPopup(){
  popupElement.classList.remove('popup__opened');
}
function closePopup(){
  popupElement.classList.add('popup__opened');
}

editProfile.addEventListener('click', openPopup);
popupClose.addEventListener('click',closePopup);


let formElement=document.querySelector('.popup__form');
nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

function formSubmitHandler (evt){
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup();
}

formElement.addEventListener('submit',formSubmitHandler);
