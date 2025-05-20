import axios, { AxiosInstance } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: true
})

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 400) {
      window.__GLOBAL_SNACKBAR__?.('Solicitação inválida.', 'error')
      localStorage.removeItem('access_token')
      setTimeout(() => (window.location.href = '/login'), 1500)
    }
    return Promise.reject(err)
  }
)

export default api
