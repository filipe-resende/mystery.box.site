export type Result<T = unknown> = {
  isSuccess: true
  isFailure: false
  value: T
  error: Error
}

export type Error = {
  code: string
  message: string
}

export type Response<T = unknown> = Result<T>
