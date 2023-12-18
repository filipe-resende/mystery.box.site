import axios, { AxiosResponse } from 'axios'
import Register from '../types/Register'

const api = axios.create({
  baseURL: process.env.REACT_APP_API
})

interface UserRegistrationResponse {
  status: number
  error: string
  message: string
}

export interface RequestReponse {
  status: number
  error: string
  message: string
  hasError: boolean
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
      const errorResponse: RequestReponse = {
        status: error.response.status,
        error: 'Conflito',
        message: 'Já existe um usuário com este email.',
        hasError: true
      }
      return errorResponse
    }
    console.error('Erro ao processar a solicitação:', error)
  }
}

export const sendEmailResetUserPassword = async (email: string) => {
  try {
    const response = await api.post<RequestReponse>('/user/forgotten', {
      email
    })
    return response.data
  } catch (error: any) {
    if (error.response && error.response.status === 409) {
      const errorResponse: RequestReponse = {
        status: error.response.status,
        error: 'Conflito',
        message: 'Já existe um usuário com este email.',
        hasError: true
      }
      return errorResponse
    }
    console.error('Erro ao processar a solicitação:', error)
  }
}

export const changeUserPassword = async (password: string, token: string) => {
  try {
    api.defaults.headers.common = { Authorization: `bearer ${token}` }
    const response = await api.patch<RequestReponse>('/user/reset', {
      password
    })
    return response.data
  } catch (error: any) {
    if (error.response && error.response.status === 409) {
      const errorResponse: RequestReponse = {
        status: error.response.status,
        error: 'Conflito',
        message: 'Já existe um usuário com este email.',
        hasError: true
      }
      return errorResponse
    }
    console.error('Erro ao processar a solicitação:', error)
  }
}
