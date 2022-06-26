import {Popup} from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._popupForm = this._popupElement.querySelector('.popup__form');
    this._inputList = this._popupElement.querySelectorAll('.popup_input');
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
// метод который собирает инфу со всей формы
  _getInputValues() {
    this._formValues = {};

    this._inoutList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  //обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues);
    })
  }
}
