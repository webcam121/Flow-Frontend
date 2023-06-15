import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { ContextApi } from './types'

const defaultContextValue = {
  token: null,
  addToken: () => null,
}

export const AuthContext = createContext<ContextApi>(defaultContextValue)

export const AuthProvider = ({ children }: any) => {
  const [storedToken, setStoredToken] = useLocalStorage<string | null>('token', null)
  const [token, setToken] = useState<string | null>(storedToken)

  const addToken = useCallback((value: string) => {
    setToken(value)
    setStoredToken(value)
  }, [setToken, setStoredToken])

  useEffect(() => {
    setToken(storedToken)
  }, [storedToken])

  const values = useMemo(
    () => ({
      token,
      addToken,
    }),
    [token, addToken]
  )

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
