export interface IError {
  error: unknown
  response: {
    data: {
      message: string
    }
  }
}
