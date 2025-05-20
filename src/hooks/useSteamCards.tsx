import { useEffect, useState } from 'react'
import Item from '@/types/Item'
import { Error, Response } from '@/types/Reponse'
import api from '@/lib/axios'
import { AxiosError } from 'axios'
import { useSnackbar } from '@/context/SnackbarContext'

export function useSteamCards() {
  const { showSnackbar } = useSnackbar()
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
        const axiosErr = err as AxiosError
        showSnackbar(axiosErr.message, 'error')
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCards()
  }, [])

  return { cards, loading, error }
}
