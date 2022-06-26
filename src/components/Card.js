export default class Card {
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
        
        this._likeButton = this._card.querySelector('.card__btn-like');
        this._trashButton = this._card.querySelector('.card__btn-trash');
        this._cardImage = this._card.querySelector('.card__image');
        this._setEventListeners();

        this._card.querySelector('.card__title').textContent = this._name;

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        return this._card;
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => {
            this._showPopup(this._name, this._link);
        });

        this._likeButton.addEventListener('click', () => {
            this._handleLikeCard();
        });

        this._trashButton.addEventListener('click', () => {
            this._handleTrashCard();
        });
    }

    _handleLikeCard() {
        this._likeButton.classList.toggle('card__btn-like_active');
    }

    _handleTrashCard() {
        this._card.remove();
        this._card = null;
    }
};
