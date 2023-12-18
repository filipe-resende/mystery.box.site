import axios from 'axios'
import Item from '../types/Item'

const api = axios.create({
  baseURL: process.env.REACT_APP_API
})

export const getSteamCards = async (): Promise<Item[]> => {
  try {
    const response = await api.get<Item[]>('/steamcard/category')
    return response.data
  } catch (error) {
    console.error('Erro ao processar a solicitação:', error)
    throw error
  }
}
