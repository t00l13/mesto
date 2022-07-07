//     КЛАСС ДЛЯ ОТПРАВКИ ЗАПРОСОВ НА СЕРВЕР

export default class Api {
    constructor({ baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._userUrl = `${this._baseUrl}/users/me`;
        this._cardsUrl = `${this._baseUrl}/cards`;
        this._likesUrl = `${this._baseUrl}/cards/likes`;
        this._token = headers['authorization'];
    }

    _handleResponse (res) {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Что-то не так, ошибка: ${res.status}`);
    }
    //--- МЕТОД ПОЛУЧЕНИЯ ИНФОРМАЦИИ ПОЛЬЗОВАТЕЛЯ
    getUserData(){
        return fetch(this._userUrl, {
            headers: {
                authorization: this._token,
            }
        })
        .then( this._handleResponse)
    }
    //--- МЕТОД СОХРАНЕНИЯ ИНФОРМАЦИИ ИНФОРМАЦИИ ПОЛЬЗОВАТЕЛЯ
    saveUserChanges({ name, about }) {
        return fetch(this._userUrl, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about,
            })
        })
        .then(this._handleResponse)
    }
    //--- МЕТОД СМЕНЫ АВАТАРА ПОЛЬЗОВАТЕЛЯ
    changeAvatar(src) {
        return fetch(`${this._userUrl}/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                avatar: src.link
            })
        })
        .then(this._handleResponse)
    }
    //--- МЕТОД ПОЛУЧЕНИЯ КАРТОЧЕК С СЕРВЕРА
    getInitialCards() {
        return fetch(this._cardsUrl, {
            headers: {
                authorization:this._token,
            }
        })
        .then(this._handleResponse)
    }
    //--- МЕТОД ПУБЛИКАЦИИ НОВОЙ КАРТОЧКИ 
    postNewCard({ name, link }) {
        return fetch(this._cardsUrl, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            }) 
        })
        .then(this._handleResponse)
    }
    //--- МЕТОД УДАЛЕНИЕ КАРТОЧКИ
    deleteCard(cardId){
        return fetch(`${this._cardsUrl}/${cardId}`, {
            method:'DELETE',
            headers: {
                authorization: this._token,
            }
        })
        .then(this._handleResponse)
    }
    //--- МЕТОД ЛАЙКА КАРТОЧКИ
    likedCard(cardId) {
        return fetch(`${this._likesUrl}/${cardId}`, {
            method:'PUT',
            headers: {
                authorization: this._token,
            }
        })
        .then(this._handleResponse)
    }
    //--- МЕТОД УДАЛЕНИЯ ЛАЙКА С КАРТОЧКИ
    dislikedCard(cardId) {
        return fetch(`${this._likesUrl}/${cardId}`, {
            method:'DELETE',
            headers: {
                authorization: this._token,
            }
        })
        .then(this._handleResponse)
    }
}