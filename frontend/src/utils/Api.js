class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl
    this._fetchObject = {}
    this._fetchObject.headers = headers
    this._fetchObject.method = 'GET'
  }

  getUserInfo() {
    this._fetchObject.headers = {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    }
    return this._request(`/users/me`, this._fetchObject)
  }

  getInitialCards() {
    this._fetchObject.headers = {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    }
    return this._request(`/cards`, this._fetchObject)
  }

  editUserInfo({ name, about }) {
    this._fetchObject.headers = {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    }
    this._fetchObject.method = 'PATCH';
    this._fetchObject.body = JSON.stringify({ name, about })

    return this._request(`/users/me`, this._fetchObject)
  }

  addCard({ name, link }) {
    this._fetchObject.headers = {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    }
    this._fetchObject.method = 'POST';
    this._fetchObject.body = JSON.stringify({ name, link })

    return this._request(`/cards`, this._fetchObject)
  }

  deleteCard(cardID) {
    this._fetchObject.headers = {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    }
    this._fetchObject.method = 'DELETE';

    return this._request(`/cards/${cardID}`, this._fetchObject)
  }

  changeAvatar(avatarLink) {
    this._fetchObject.headers = {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    }
    this._fetchObject.method = 'PATCH';
    this._fetchObject.body = JSON.stringify({ avatar: avatarLink })

    return this._request(`/users/me/avatar`, this._fetchObject)
  }

  toggleLike(cardID, isLiked) {
    this._fetchObject.headers = {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    }
    if (isLiked) {
      return this._deleteLike(cardID)
    }
    return this._pressLike(cardID)
  }

  _pressLike(cardID) {
    this._fetchObject.headers = {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    }
    this._fetchObject.method = 'PUT';

    return this._request(`/cards/${cardID}/likes`, this._fetchObject)
  }

  _deleteLike(cardID) {
    this._fetchObject.headers = {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    }
    this._fetchObject.method = 'DELETE';

    return this._request(`/cards/${cardID}/likes`, this._fetchObject)
  }

  _request(endpoint, fetchObject) {
    return fetch(`${this._baseUrl}${endpoint}`, fetchObject)
      .then(this._checkResponse)
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    console.log(`Ошибка: ${res.status}`);
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
});


export default api