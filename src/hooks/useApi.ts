import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API
})

export const useApi = () => ({
  validate: async (token: string) => {
    try {
      api.defaults.headers.common = { Authorization: `bearer ${token}` }
      return api.post('user/validate').then(respose => respose.data)
    } catch (error) {
      console.log('Erro ao fazer login. Verifique suas credenciais.')
    }
  },
  signin: async (email: string, password: string) => {
    try {
      return await api
        .post('user/signIn', { email, password })
        .then(respose => respose.data)
    } catch (err) {
      return {
        error: err.response.statusText,
        status: err.response ? err.response.status : 500,
        message: err.response
          ? err.response.data.title
          : 'Erro ao fazer login. Verifique suas credenciais.',
        hasError: true
      }
    }
  },
  logout: async () => {
    const response = await api.post('/logout')
    return response.data
  }
})
