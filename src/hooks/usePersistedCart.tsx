import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { adicionarItem } from '@/redux/store'
import Item from '@/types/Item'
import { useSnackbar } from '@/context/SnackbarContext'

export default function usePersistedCart() {
  const { showSnackbar } = useSnackbar()

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
      showSnackbar('Erro ao carregar carrinho do cookie:', 'error')
    }
  }, [dispatch])
}
