import { useState } from 'react'
import Item from '@/types/Item'
import { Card } from '@/types/payment/Card'
import api from '@/lib/axios'
import { useSnackbar } from '@/context/SnackbarContext'
import { AxiosError } from 'axios'

export function useCheckout() {
  const { showSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const processPayment = async (card: Card, item: Item[]) => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.post('/payment', { card, item })
      if (response.data.isSuccess) {
        return response.data
      } else {
        setError(response.data.error.messag)
      }
    } catch (err) {
      const axiosErr = err as AxiosError
      showSnackbar(axiosErr.message, 'error')
      setError('Erro ao processar pagamento')
      return null
    } finally {
      setLoading(false)
    }
  }

  return { processPayment, loading, error }
}
