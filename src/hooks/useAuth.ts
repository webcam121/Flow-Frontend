import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const useAuth = () => {
  const authContext = useContext(AuthContext)

  if (authContext === undefined) {
    throw new Error('Auth context undefined')
  }

  return authContext
}

export default useAuth
