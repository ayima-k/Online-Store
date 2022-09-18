const BASE_URL = 'https://final-project-7cd43-default-rtdb.asia-southeast1.firebasedatabase.app/'

export const API = {
  get: (url) => {
    return fetch(`${BASE_URL}${url}.json`, {
      method: 'GET',
      headers: {
        'Content-type' : 'application/json'
      }
    }).then(r => r.json())
  },
  post: (url, data) => {
    return fetch(`${BASE_URL}${url}.json`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type' : 'application/json'
      }
    }).then(r => r.json())
  },
  put: (url, data) => {
    return fetch(`${BASE_URL}${url}.json`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-type' : 'application/json'
      }
    }).then(r => r.json())
  },
  patch: (url, data) => {
    return fetch(`${BASE_URL}${url}.json`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-type' : 'application/json'
      }
    }).then(r => r.json())
  },
  delete: url => {
    return fetch(`${BASE_URL}${url}.json`, {
      method:'DELETE',
      headers: {
        'Content-type':'application/json'
      }
    }).then(r => r.json())
  }
}