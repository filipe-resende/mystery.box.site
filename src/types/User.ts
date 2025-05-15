export type User = {
  id: number
  name: string
  email: string
}

export type UserAuth = {
  user: User
  token: string
}
