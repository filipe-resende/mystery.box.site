import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import ShoppingCartState from '../types/ShoppingCartState'
import Item from '../types/Item'
import Cookies from 'js-cookie'

const initialState: ShoppingCartState = {
  itens: []
}

const salvarCarrinhoNoCookie = (itens: Item[]) => {
  Cookies.set('carrinho', JSON.stringify(itens), { expires: 7 }) // 7 dias
}

const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    adicionarItem: (state, action: PayloadAction<Item>) => {
      const itemExistente = state.itens.find(i => i.id === action.payload.id)

      if (itemExistente) {
        itemExistente.quantity += action.payload.quantity
      } else {
        state.itens.push(action.payload)
      }
      salvarCarrinhoNoCookie(state.itens)
    },

    atualizarItem: (state, action: PayloadAction<{ id: number }>) => {
      const item = state.itens.find(i => i.id === action.payload.id)
      if (item) {
        item.quantity += 1
      }
      salvarCarrinhoNoCookie(state.itens)
    },

    diminuirItem: (state, action: PayloadAction<{ id: number }>) => {
      const item = state.itens.find(i => i.id === action.payload.id)
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          state.itens = state.itens.filter(i => i.id !== action.payload.id)
        }
      }
    },

    removerItem: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter(item => item.id !== action.payload)
      salvarCarrinhoNoCookie(state.itens)
    }
  }
})

export const { adicionarItem, removerItem, atualizarItem, diminuirItem } =
  carrinhoSlice.actions

const store = configureStore({
  reducer: {
    carrinho: carrinhoSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
