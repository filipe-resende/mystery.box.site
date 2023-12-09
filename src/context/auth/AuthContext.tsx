import { createContext } from 'react'
import { User } from '../../types/User'

export type AuthContextType = {
  user: User | null
  token: string
  signin: (email: string, password: string) => void
  signout: () => void
}

export const AuthContext = createContext<AuthContextType>(null)
