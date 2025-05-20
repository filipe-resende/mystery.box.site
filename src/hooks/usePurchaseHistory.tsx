import { useEffect, useState } from 'react'
import axios from 'axios'
import { Result } from '@/types/Reponse'

export type PurchaseHistoryDTO = {
  id: string
  productName: string
  purchaseDate: string
  status: string
  email: string
  key: string | null
  unitPrice: number
  quantity: number
}

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: true
})

export function usePurchaseHistory() {
  const [purchases, setPurchases] = useState<PurchaseHistoryDTO[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response =
          await api.get<Result<PurchaseHistoryDTO[]>>('/purchasehistory')
        if (response.data.isSuccess) {
          return setPurchases(response.data.value)
        } else {
          setError(response.data.error.message)
        }
      } catch (err: any) {
        setError('Erro ao carregar histórico de compras.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { purchases, loading, error }
}
