import { createContext, ReactNode, useState, useEffect } from 'react'
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import { api } from '../services/api'

WebBrowser.maybeCompleteAuthSession()

interface IUserProps {
  name: string
  avatarUrl: string
}

export interface IAuthContextDataProps {
  user: IUserProps
  isUserLoading: boolean
  signIn: () => Promise<void>
}

interface IAuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as IAuthContextDataProps)

export function AuthContextProvider({ children }: IAuthProviderProps) {
  const [isUserLoading, setIsUserLoading] = useState(false)
  const [user, setUser] = useState<IUserProps>({} as IUserProps)

  const [request, response, propmtAsync] = Google.useAuthRequest({
    clientId: process.env.CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  })

  async function signIn() {
    try {
      setIsUserLoading(true)
      await propmtAsync()
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      setIsUserLoading(false)
    }
  }

  async function signInWithGoogle(access_token: string) {
    console.log('Token de autenticação --> ', access_token)

    try {
      setIsUserLoading(true)

      const tokenResponse = await api.post('/users', { access_token })
      console.log(tokenResponse.data)

      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${tokenResponse.data.token}`

      const userInfoResponse = await api.get('/me')
      console.log(userInfoResponse.data)
      setUser(userInfoResponse.data.user)

    } catch (error) {
      console.log(error)
      throw error
    } finally {
      setIsUserLoading(false)
    }
  }

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response])

  return (
    <AuthContext.Provider
      value={{
        isUserLoading,
        signIn,
        user
      }}>
      {children}
    </AuthContext.Provider>
  )
}
