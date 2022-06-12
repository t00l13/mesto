export class Card {
    constructor(data, templateSelector, showFunction) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._showPopup = showFunction;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._card = this._getTemplate();
        this._setEventListeners();

        this._card.querySelector('.card__title').textContent = this._name;

        const cardImage = this._card.querySelector('.card__image');
        cardImage.src = this._link;
        cardImage.alt = this._name;

        return this._card;
    }

    _setEventListeners() {
        this._card.querySelector('.card__image').addEventListener('click', () => {
            this._showPopup(this._name, this._link);
        });

        this._card.querySelector('.card__btn-like').addEventListener('click', () => {
            this._handleLikeCard();
        });

        this._card.querySelector('.card__btn-trash').addEventListener('click', () => {
            this._handleTrashCard();
        });
    }

    _handleLikeCard() {
        this._card.querySelector('.card__btn-like').classList.toggle('card__btn-like_active');
    }

    _handleTrashCard() {
        this._card.remove();
        this._card = null;
    }
};

