import { useState } from 'react'
import axios from 'axios'
import Item from '@/types/Item'
import { Card } from '@/types/payment/Card'

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: true
})

export function useCheckout() {
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
      console.error('Erro ao processar pagamento', err)
      setError('Erro ao processar pagamento')
      return null
    } finally {
      setLoading(false)
    }
  }

  return { processPayment, loading, error }
}
