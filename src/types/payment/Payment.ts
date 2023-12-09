import Item from '../Item'
import { Card } from './Card'

export default interface Payment {
  card: Card
  itens: Item[]
}
