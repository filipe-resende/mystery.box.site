import { useEffect, useState } from 'react'
import axios from 'axios'
import Item from '@/types/Item'
import { Error, Response } from '@/types/Reponse'

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: true
})

export function useSteamCards() {
  const [cards, setCards] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>(null)

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await api.get<Response<Item[]>>('/steamcard/category')
        if (response.data.isSuccess) {
          setCards(response.data.value)
        } else {
          setError(response.data.error)
        }
      } catch (err) {
        setError(err)
        console.error('Erro ao processar a solicitação:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCards()
  }, [])

  return { cards, loading, error }
}
