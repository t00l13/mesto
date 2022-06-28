// --- КЛАСС ВАЛИДАЦИИ ФОРМ ---

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

  //метод появления сообщения об ошибке
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  //метод скрытия сообщения об ошибке
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }


  //метод управления сообщениями об ошибках
  _checkInputValidity(inputElement) {
    if(inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  }

  //метод проверки на невалидные поля
  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }


  //метод включения/выключения кнопки submit в форме
  _toggleButtonState(inputList, buttonElement) {
    if(this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  //метод добавления слушателей для каждого поля ввода
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

  //метод сброса результатов проверки формы
  resetValidationState() {
    const form = this._formElement.querySelector(this._formSelector);
    const inputsArr = Array.from(form.querySelectorAll(this._inputSelector));
    const buttonElement = form.querySelector(this._submitBtnSelector);

    this._toggleButtonState(inputsArr, buttonElement);

    inputsArr.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  //метод включения валидации
  enableValidation() {
    this._setEventListeners();
  }
}
