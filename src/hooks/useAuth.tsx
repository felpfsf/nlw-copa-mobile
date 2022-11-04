import { useContext } from 'react'
import { AuthContext, IAuthContextDataProps } from '../contexts/AuthContext'

export function useAuth(): IAuthContextDataProps {
  const context = useContext(AuthContext)
  return context
}
