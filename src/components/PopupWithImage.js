// КЛАСС КОТОРЫЙ СОЗДАЕТ ПОПАП С ИЗОБРАЖЕНИЕМ
import {Popup} from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupTitle = this._popupElement.querySelector('popup__photo-title');
    this._popupImage = this._popupElement.querySelector('popup__photo');
  }

  open(title, link){
    super.open();
    this._popupImage.src = link;
    this._popupImage.alt = `Фото ${title}`;
  }
}
