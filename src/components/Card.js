export default class Card {
    constructor({ data, showFunction, handleLikeClick, handleTrashClick }, templateSelector, userId) {
        this._templateSelector = templateSelector;
        this._name = data.name;
        this._link = data.link;
        this._idOwner = data.owner._id;
        this._cardId = data._id;
        this._likes = data.likes;
        this._showPopup = showFunction;
        this._handleLikeClick = handleLikeClick;
        this._handleTrashClick = handleTrashClick;
        this._userId = userId;
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
        this._cardTitle = this._card.querySelector('.card__title');
        this._cardTitle.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        // кнопка корзины только у карточек пользователя 
        if (this._userId !== this._idOwner) {
            this._trashButton.remove();
        }

        this.setLikes(this._likes);

        this._setEventListeners();

        return this._card;
    }
    removeCard() {
        this._card.remove();
        this._card = null;
    }

    setLikes(arr) {
        this._likes = arr;
        this._card.querySelector('.card__sum-like').textContent = arr.length;
        if (this._checkLike()) {
            this._likeButton.classList.add('card__btn-like_active');
        } else {
            this._likeButton.classList.remove('card__btn-like_active');
        }
    }
    _checkLike() {
        return this._likes.some(like => {
            return like._id === this._userId;
        });
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => {
            this._showPopup(this._name, this._link);
        });
        this._trashButton.addEventListener('click', () => {
            this._handleTrashClick(this._cardId, this);
        });

        this._likeButton.addEventListener('click', () => {
            this._handleLikeClick(this._cardId, this._checkLike(), this)
        });
    }

};
