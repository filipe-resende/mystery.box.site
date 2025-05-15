import { createContext } from 'react'
import { User } from '@/types/User'
import { RequestReponse } from '@/hooks/useUser'

export type AuthContextType = {
  user: User | null
  token: string
  signin: (email: string, password: string) => Promise<RequestReponse>
  validate: (token: string) => void
  signout: () => void
}

export const AuthContext = createContext<AuthContextType>(null)
