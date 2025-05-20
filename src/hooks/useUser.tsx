import { useState } from 'react'
import { Register } from '../types/Register'
import { Response, Result } from '@/types/Reponse'
import { ProfileFormData } from '@/types/ProfileFormData'
import { AxiosError } from 'axios'
import { useSnackbar } from '@/context/SnackbarContext'
import api from '@/lib/axios'

export interface RequestReponse {
  status: number
  error: string
  message: string
  hasError: boolean
}

export function useUser() {
  const { showSnackbar } = useSnackbar()
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
      showSnackbar(axiosErr.message, 'warning')
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
      const axiosErr = err as AxiosError
      showSnackbar(axiosErr.message, 'warning')
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
      const axiosErr = err as AxiosError
      showSnackbar(axiosErr.message, 'warning')
    } finally {
      setLoading(false)
    }
  }

  const updateUserProfile = async (
    profile: ProfileFormData
  ): Promise<RequestReponse | undefined> => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.put<RequestReponse>('/profile', profile)
      return response.data
    } catch (err: any) {
      setError('Erro ao atualizar perfil.')
      const axiosErr = err as AxiosError
      showSnackbar(axiosErr.message, 'warning')
    } finally {
      setLoading(false)
    }
  }

  const getUserProfile = async (): Promise<ProfileFormData | undefined> => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.get<Result<ProfileFormData>>('/profile')
      if (response.data.isSuccess) {
        return response.data.value
      } else {
        setError(response.data.error.message)
      }
    } catch (err: any) {
      setError('Erro ao carregar perfil.')
      const axiosErr = err as AxiosError
      showSnackbar(axiosErr.message, 'warning')
    } finally {
      setLoading(false)
    }
  }

  return {
    registerUser,
    getUserProfile,
    sendEmailResetUserPassword,
    changeUserPassword,
    updateUserProfile,
    loading,
    error
  }
}
