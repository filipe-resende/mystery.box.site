import axios, { AxiosError, AxiosResponse } from 'axios'
import Register from '../types/Register'

const api = axios.create({
  baseURL: process.env.REACT_APP_API
})

interface UserRegistrationResponse {
  status: number
  error: string
  message: string
}

interface ErrorResponse {
  status: number
  error: string
  message: string
}

export const registerUser = async (register: Register) => {
  try {
    const response: AxiosResponse<UserRegistrationResponse> = await api.post(
      '/user',
      register
    )
    return response.data // Retorna os dados normais em caso de sucesso.
  } catch (error: any) {
    if (error.response && error.response.status === 409) {
      const errorResponse: ErrorResponse = {
        status: error.response.status,
        error: 'Conflito',
        message: 'Já existe um usuário com este email.'
      }
      return errorResponse
    }
    console.error('Erro ao processar a solicitação:', error)
  }
}
