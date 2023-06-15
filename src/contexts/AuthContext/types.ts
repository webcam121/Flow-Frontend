export interface ContextApi {
  token: string | null
  addToken: (value: string) => void
}
