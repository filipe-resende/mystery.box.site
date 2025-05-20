import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: true
})

// Tipagem de erro esperado na resposta
interface ApiErrorResponse {
  type?: string
  title?: string
  status?: number
  errors?: Record<string, string[]>
  message?: string
  traceId?: string
}

// Interceptor global
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response?.status === 400) {
      console.warn('Erro 400 detectado. Redirecionando para login ou logout...')

      // Exemplo: limpar token/localStorage
      localStorage.removeItem('access_token')

      // Redireciona para a página de login
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export default api
