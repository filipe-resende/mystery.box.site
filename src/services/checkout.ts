import axios from 'axios'
import Item from '../types/Item'
import { Card } from '../types/payment/Card'

const api = axios.create({
  baseURL: process.env.REACT_APP_API
})

export const processPayment = async (
  card: Card,
  item: Item[],
  token: string
) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`
    }

    return await api
      .post('/payment', { card, item }, { headers })
      .then(respose => respose.data)
  } catch (err) {
    console.log('Erro ao processar pagamento')
  }
}
