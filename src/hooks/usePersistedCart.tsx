// src/hooks/usePersistedCart.ts
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { adicionarItem } from '@/redux/store'
import Item from '@/types/Item'

export default function usePersistedCart() {
  const dispatch = useDispatch()

  useEffect(() => {
    const carrinhoSalvo = Cookies.get('carrinho')
    if (!carrinhoSalvo) return

    try {
      const itens: Item[] = JSON.parse(carrinhoSalvo)

      if (Array.isArray(itens)) {
        itens.forEach(item => dispatch(adicionarItem(item)))
      }
    } catch (err) {
      console.error('Erro ao carregar carrinho do cookie:', err)
    }
  }, [dispatch])
}
