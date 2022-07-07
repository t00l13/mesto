// КЛАСС ВАЛИДАЦИИ

export default class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitBtnSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    this._buttonElement = formElement.querySelector(this._submitBtnSelector);
    this._form = formElement.querySelector(this._formSelector);
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
  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }


    //* ПОВЕДЕНИЕ КНОПКИ submit ПРИ ВАЛИДНОСТИ И НЕВАЛИДНОСТИ *
  _toggleButtonState() {
    if(this._hasInvalidInput()) {
      this._buttonElement.setAttribute('disabled', true);
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

    //* СЛУШАТЕЛИ input'ов *
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);

        this._toggleButtonState();
      });
    });
  }

    // УДАЛЕНИЕ ОШИБОК ВАЛИДАЦИИ
  deleteValidationError() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  //ВАЛИДАЦИЯ ФОРМ
  enableValidation() {
    this._setEventListeners();
  }
}
