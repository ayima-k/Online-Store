import { API } from "./api"

export const getCards = () => API.get(`cards/`)

export const createCard = data => {
  return API.post('cards', data)
}

export const getMessages = () => API.get('messages/')
export const postMessage = data => {
  return API.post('messages', data)
}

export const getSingleProduct = (cardId) => API.get(`cards/${cardId}/`)

export const getSingleFavorite = (userId, cardId) => {
  return API.get(`users/${userId}/favorites/${cardId}/`)
}
export const getFavorites = (userId) => {
  return API.get(`users/${userId}/favorites/`)
}
export const addToFavorites = (data, userId, cardId) => {
  return API.put(`users/${userId}/favorites/${cardId}`, data)
}
export const removeFromFavorites = (userId, cardId) => {
  return API.delete(`users/${userId}/favorites/${cardId}/`)
}


export const getSingleFromBasket = (userId, cardId) => {
  return API.get(`users/${userId}/basket/${cardId}/`)
}
export const getBasket = (userId) => {
  return API.get(`users/${userId}/basket/`)
}
export const addToBasket = (data, userId, cardId) => {
  return API.put(`users/${userId}/basket/${cardId}/`, data)
}
export const updatePage = (data, userId, cardId) => {
  return API.put(`users/${userId}/basket/${cardId}/`, data)
}
export const removeFromCart = (userId, cardId) => {
  return API.delete(`users/${userId}/basket/${cardId}`)
}
export const removeAllCart = (userId) => {
  return API.delete(`users/${userId}/basket`)
}
export const updateTotal = (data, userId, cardId) => {
  return API.put(`users/${userId}/basket/${cardId}/`, data)
}
export const updateCount = (data, userId, cardId) => {
  return API.put(`users/${userId}/basket/${cardId}/`, data)
}
export const updateSize = (data, cardId) => {
  return API.patch(`cards/${cardId}`, data)
}
export const updateSizeBasket = (data, cardId, userId) => {
  return API.patch(`users/${userId}/basket/${cardId}`, data)
}
export const updateSizeFavorite = (data, cardId, userId) => {
  return API.patch(`users/${userId}/favorites/${cardId}`, data)
}


export const createUser = (data, userId) => {
  return API.put(`users/${userId}`, data)
}
export const getUser = (userId) => API.get(`users/${userId}`)
export const updateProfiles = (data, userId) => API.patch(`users/${userId}`, data)



export const addReview = (data, cardId) => {
  return API.post(`cards/${cardId}/reviews`, data)
}
export const putReview = (data, userId, cardId) => {
  return API.put(`users/${userId}/reviews/${cardId}`, data)
}
export const deleteReviewUser = (userId, cardId) => {
  return API.delete(`users/${userId}/reviews/${cardId}`)
}
export const getOrder = () => {
  return API.get('orders/')
}
export const postOrder = (data, userId, cardId) => {
  return API.put(`users/${userId}/orders/${cardId}`, data)
}
export const addOrder = (data, cardId) => {
  return API.put(`orders/${cardId}`, data)
} 
export const deleteOrder = (userId, cardId) => {
  return API.delete(`users/${userId}/orders/${cardId}`)
}
export const removeOrder = (cardId) => {
  return API.delete(`orders/${cardId}`)
}