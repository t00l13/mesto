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
    _hasInvalidInput(_inputList) {
        //проход по этому массиву методом some
        return this._inputList.some(inputElement => {
            //если поле не валидно, колбэк вернет тру
            return !inputElement.validity.valid;
        });
    };

    //* ПОВЕДЕНИЕ КНОПКИ submit ПРИ ВАЛИДНОСТИ И НЕВАЛИДНОСТИ *
    _toggleButtonState(_inputList, _submitButton) {
        if (this._hasInvalidInput(this._inputList)) {
            //сделай кнопку неактивной
            this._submitButton.setAttribute('disabled', true);
            this._submitButton.classList.add(this._inactiveButtonClass);
        } else {
            // иначе сделай кнопку активной
            this._submitButton.removeAttribute('disabled');
            this._submitButton.classList.remove(this._inactiveButtonClass);
        }
    };

    //* СЛУШАТЕЛИ input'ов *
    _setEventListeners() {
        this._errorForm = this._formElement.querySelector(this._formSelector);
        //элемент кнопки
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
        //массив инпутов
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        //функция переключателя
        this._toggleButtonState(this._inputList, this._submitButton);

        this._inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', () => {

            this._checkInputValidity(inputElement);
            this._toggleButtonState(this._inputList, this._submitButton);

          });
        });
      }

    // УДАЛЕНИЕ ОШИБОК ВАЛИДАЦИИ
    deleteValidationError() {
        //получаем форму
        

        if (this._errorForm) {
            this._toggleButtonState(this._inputList, this._submitButton);
            //перебираем каждый инпут и вызываем у них функцию hideInputError c нашими параметрами
            this._inputList.forEach((inputElement) => {
                this._hideInputError(inputElement);
            });
        }
    }

    //* ВАЛИДАЦИЯ ВСЕХ ФОРМ *
    enableValidation() {
        this._setEventListeners();
    }

}