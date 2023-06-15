import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth'

export const AuthenticatedWrapper = ({ children }: any) => {
  const navigate = useNavigate();
  const { token } = useAuth()

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate])

  return <>{children}</>
}

export const UnauthenticatedWrapper = ({ children }: any) => {
  const navigate = useNavigate();
  const { token } = useAuth()

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [ token, navigate])

  return <>{children}</>
}
