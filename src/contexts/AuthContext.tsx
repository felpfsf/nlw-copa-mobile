import { createContext, ReactNode, useState, useEffect } from 'react'
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'

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
    clientId:
      '974114136127-tb4q9fab1h6v05je5cjo9gtnar118t9t.apps.googleusercontent.com',
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
