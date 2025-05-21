import usePersistedCart from '@/hooks/usePersistedCart'

export default function AppInitializer() {
  usePersistedCart()
  return null
}
