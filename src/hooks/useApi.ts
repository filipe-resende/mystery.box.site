import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API
})

export const useApi = () => ({
  validateToken: async (token: string) => {
    return api.post('/validate', { token }).then(respose => respose.data)
  },
  signin: async (email: string, password: string) => {
    try {
      return await api
        .post('user/signIn', { email, password })
        .then(respose => respose.data)
    } catch (err) {
      console.log('Erro ao fazer login. Verifique suas credenciais.')
    }
  },
  logout: async () => {
    const response = await api.post('/logout')
    return response.data
  }
})
