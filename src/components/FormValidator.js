// КЛАСС ВАЛИДАЦИИ

export default class FormValidator {
  constructor(config, popupSelector) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitBtnSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = document.querySelector(popupSelector);
  }

  //приватный метод showInputError ПОКАЗЫВАЕТ СООБЩЕНИЕ ОБ ОШИБКЕ *
  _showInputError(inputElement, errorMessage) {
    //находим элемент ошибки в форме
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  //приватный метод hideInputError СКРЫВАЕТ СООБЩЕНИЕ ОБ ОШИБКЕ *
  _hideInputError(inputElement) {
    //находим элемент ошибки в форме
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }


  //УПРАВЛЕНИЕ СООБЩЕНИЯМИ ОШИБОК
  _checkInputValidity(inputElement) {
    if(inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  }

  //ПРОВЕРКА ВАЛИДНОСТИ полей
  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }


    //* ПОВЕДЕНИЕ КНОПКИ submit ПРИ ВАЛИДНОСТИ И НЕВАЛИДНОСТИ *
  _toggleButtonState(inputList, buttonElement) {
    if(this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

    //* СЛУШАТЕЛИ input'ов *
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitBtnSelector);
    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);

        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

    // УДАЛЕНИЕ ОШИБОК ВАЛИДАЦИИ
  deleteValidationError() {
    const form = this._formElement.querySelector(this._formSelector);
    const inputsArr = Array.from(form.querySelectorAll(this._inputSelector));
    const buttonElement = form.querySelector(this._submitBtnSelector);

    this._toggleButtonState(inputsArr, buttonElement);

    inputsArr.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  //ВАЛИДАЦИЯ ФОРМ
  enableValidation() {
    this._setEventListeners();
  }
}
