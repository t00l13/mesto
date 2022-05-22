//
//
// ВАЛИДАЦИЯ
//
//

//* showInputError ПОКАЗЫВАЕТ СООБЩЕНИЕ ОБ ОШИБКЕ *
function showInputError(formElement, inputElement, errorMessage, formObject) {
  //находим элемент ошибки внутри функции
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(formObject.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formObject.errorClass);
}

//* hideInputError СКРЫВАЕТ СООБЩЕНИЕ ОБ ОШИБКЕ *
function hideInputError(formElement, inputElement, formObject) {
  //находим элемент ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  //
  inputElement.classList.remove(formObject.inputErrorClass);
  errorElement.classList.remove(formObject.errorClass);
  errorElement.textContent = '';
}

//* УПРАВЛЕНИЕ СООБЩЕНИЕЯМИ ОШИБОК *
function checkInputValidity(formElement, inputElement, formObject) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formObject);
  } else {
    hideInputError(formElement, inputElement, formObject);
  };
};

//* ПРОВЕРКА ВАЛИДНОСТИ ПОЛЕЙ *
function hasInvalidInput(inputList) {
  //проход по этому массиву методом some
  return inputList.some(inputElement => {
    //если поле не валидно, колбэк вернет тру
    return !inputElement.validity.valid;
  });
};

//* ПОВЕДЕНИЕ КНОПКИ submit ПРИ ВАЛИДНОСТИ И НЕВАЛИДНОСТИ *
function toggleButtonState(inputList, buttonElement, formObject) {
  if(hasInvalidInput(inputList)) {
    //сделай кнопку неактивной
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(formObject.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(formObject.inactiveButtonClass);
  }
}

//* СЛУШАТЕЛИ input'ов *
function setEventListeners(formElement, formObject) {
  const inputList = Array.from(formElement.querySelectorAll(formObject.inputSelector));
  const buttonElement = formElement.querySelector(formObject.submitButtonSelector);
  //чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement, formObject);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, formObject);
      toggleButtonState(inputList, buttonElement, formObject);
    });
  });
}

// УДАЛЕНИЕ ОШИБОК ВАЛИДАЦИИ
function deleteValidationError (popup, formObject) {
  //получаем форму
  const errorForm = popup.querySelector(formObject.formSelector);

  if (errorForm) {
    //получаем массив инпутов
    const inputsArr = Array.from(errorForm.querySelectorAll(formObject.inputSelector));
    //кнопка сабмита
    const buttonElement = errorForm.querySelector(formObject.submitButtonSelector);
    //вызываем функцию поведения кнопки
    toggleButtonState(inputsArr, buttonElement, formObject);
    //перебираем каждый инпут и вызываем у них функцию hideInputError c нашими параметрами
    inputsArr.forEach((inputElement) => {
      hideInputError(errorForm, inputElement, formObject);
    });
  }
}

//* ВАЛИДАЦИЯ ВСЕХ ФОРМ *
function enableValidation(formObject) {
  //все формы делаем в массив
  const formList = Array.from(document.querySelectorAll(formObject.formSelector));
  //перебор полученной коллекции
  formList.forEach((formElement) => {
    setEventListeners(formElement, formObject);
  });
}
