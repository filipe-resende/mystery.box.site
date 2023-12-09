import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import ShoppingCartState from '../types/ShoppingCartState'
import Item from '../types/Item'

// Defina os tipos para as ações
interface AdicionarItemAction {
  type: 'cart/adicionarItem'
  payload: Item
}

interface RemoverItemAction {
  type: 'cart/removerItem'
  payload: number
}

interface AtualizarItemAction {
  type: 'cart/atualizarItem'
  payload: { id: number }
}

// Crie um tipo de ação que inclua todas as ações possíveis
type ShoppingCartAction =
  | AdicionarItemAction
  | RemoverItemAction
  | AtualizarItemAction

// Defina o tipo do estado do carrinho
const initialState: ShoppingCartState = {
  itens: []
}

const carrinhoSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    adicionarItem: (state, action: PayloadAction<Item>) => {
      state.itens.push(action.payload)
    },
    removerItem: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter(item => item.id !== action.payload)
    },
    atualizarItem: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload
      const itemExistente = state.itens.find(item => item.id === id)

      if (itemExistente) {
        itemExistente.quantity = itemExistente.quantity + 1
      }
    }
  }
})

const store = configureStore({
  reducer: {
    carrinho: carrinhoSlice.reducer
  }
})

export const { adicionarItem, removerItem, atualizarItem } =
  carrinhoSlice.actions

export default store
