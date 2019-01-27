// import {HTTP} from '../main'
//
// // Функция делает запрос к API для получения JWT,
// // затем производит запись JWT и username в localStorage
// export function signIn (username, password) {
//   return HTTP.post('/signin', {
//     username: username,
//     password: password
//   }).then((response) => {
//     if (response.status === 200) {
//       localStorage.setItem('token', 'Bearer ' + response.data.token)
//       localStorage.setItem('username', username)
//       return true
//     }
//     return false
//   })
// }
//
// // Функция делает запрос к API для обновления текущего JWT,
// // затем производит запись JWT в localStorage
// export function refreshToken () {
//   return HTTP.get('/refreshToken', {
//     headers: {
//       Authorization: localStorage.getItem('token')
//     }
//   }).then((response) => {
//     if (response.status === 200) {
//       localStorage.setItem('token', 'Bearer ' + response.data.token)
//       return true
//     } else {
//       this.localStorage.removeItem('token')
//       this.localStorage.removeItem('username')
//       return false
//     }
//   })
// }
//
// // Функция проверяет наличие JWT у пользователя
// export function checkLoggedIn () {
//   return localStorage.getItem('username') !== null && localStorage.getItem('token') !== null
// }
//
// // Функция удаляет учетные данные пользователя
// // из его браузера
// export function clearCredentials () {
//   localStorage.removeItem('username')
//   localStorage.removeItem('token')
// }
