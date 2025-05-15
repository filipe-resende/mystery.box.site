import { useState } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import Register from '../types/Register'
import { Response } from '@/types/Reponse'

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: true
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

export function useUser() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const registerUser = async (register: Register): Promise<Response> => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.post<Response>('/user', register)
      return response.data
    } catch (err: any) {
      const axiosErr = err as AxiosError
      console.error(axiosErr)
    } finally {
      setLoading(false)
    }
  }

  const sendEmailResetUserPassword = async (
    email: string
  ): Promise<RequestReponse | undefined> => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.post<RequestReponse>('/user/forgotten', {
        email
      })
      return response.data
    } catch (err: any) {
      if (err.response?.status === 409) {
        return {
          status: 409,
          error: 'Conflito',
          message: 'Já existe um usuário com este email.',
          hasError: true
        }
      }
      setError('Erro ao solicitar redefinição de senha.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const changeUserPassword = async (
    password: string,
    token: string
  ): Promise<RequestReponse | undefined> => {
    setLoading(true)
    setError(null)

    try {
      api.defaults.headers.common = { Authorization: `Bearer ${token}` }
      const response = await api.patch<RequestReponse>('/user/reset', {
        password
      })
      return response.data
    } catch (err: any) {
      if (err.response?.status === 409) {
        return {
          status: 409,
          error: 'Conflito',
          message: 'Já existe um usuário com este email.',
          hasError: true
        }
      }
      setError('Erro ao redefinir a senha.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return {
    registerUser,
    sendEmailResetUserPassword,
    changeUserPassword,
    loading,
    error
  }
}
