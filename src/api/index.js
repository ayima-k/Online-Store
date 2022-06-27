import { API } from "./api"

export const getCards = () => API.get(`cards/`)

export const createCard = data => {
  return API.post('cards', data)
}

export const getMessages = () => API.get('messages/')

export const postMessage = data => {
  return API.post('messages', data)
}