export class FormValidator {
    constructor(config, form) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = form;
    }

    //* showInputError ПОКАЗЫВАЕТ СООБЩЕНИЕ ОБ ОШИБКЕ *
    _showInputError(inputElement, errorMessage) {
        //находим элемент ошибки внутри функции
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    //* hideInputError СКРЫВАЕТ СООБЩЕНИЕ ОБ ОШИБКЕ *
    _hideInputError( inputElement ) {
        //находим элемент ошибки
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        //
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    //* УПРАВЛЕНИЕ СООБЩЕНИЕЯМИ ОШИБОК *
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        };
    };

    //* ПРОВЕРКА ВАЛИДНОСТИ ПОЛЕЙ *
    _hasInvalidInput(inputList) {
        //проход по этому массиву методом some
        return inputList.some(inputElement => {
            //если поле не валидно, колбэк вернет тру
            return !inputElement.validity.valid;
        });
    };

    //* ПОВЕДЕНИЕ КНОПКИ submit ПРИ ВАЛИДНОСТИ И НЕВАЛИДНОСТИ *
    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            //сделай кнопку неактивной
            buttonElement.setAttribute('disabled', true);
            buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            // иначе сделай кнопку активной
            buttonElement.removeAttribute('disabled');
            buttonElement.classList.remove(this._inactiveButtonClass);
        } 
    };

    //* СЛУШАТЕЛИ input'ов *
    _setEventListeners() {
        //элемент кнопки
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        //массив инпутов
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        //функция переключателя
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
        //получаем форму
        const errorForm = this._formElement.querySelector(this._formSelector);

        if (errorForm) {
            //получаем массив инпутов
            const inputsArr = Array.from(errorForm.querySelectorAll(this._inputSelector));
            //кнопка сабмита
            const buttonElement = errorForm.querySelector(this._submitButtonSelector);
            //вызываем функцию поведения кнопки
            this._toggleButtonState(inputsArr, buttonElement);
            //перебираем каждый инпут и вызываем у них функцию hideInputError c нашими параметрами
            inputsArr.forEach((inputElement) => {
                this._hideInputError(inputElement);
            });
        }
    }

    //* ВАЛИДАЦИЯ ВСЕХ ФОРМ *
    enableValidation() {
        this._setEventListeners();
    }

}