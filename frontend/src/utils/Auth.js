const BASE_URL = 'http://api.nikolaev-maxim-mesto.nomoreparties.co'

function register({ email, password }) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password, email })
  })
    .then(res => checkResponse(res))
}

function login({ email, password }) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password, email })
  })
    .then(res => checkResponse(res))
}
function checkToken(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    }
  })
    .then(res => checkResponse(res));
}

const checkResponse = res => res.ok ? res.json() : Promise.reject('Ошибка')

export { register, login, checkToken }