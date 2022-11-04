import { createContext, ReactNode } from 'react'

interface IUserProps {
  name: string
  avatarUrl: string
}

export interface IAuthContextDataProps {
  user: IUserProps
  signIn: () => Promise<void>
}

interface IAuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as IAuthContextDataProps)

export function AuthContextProvider({ children }: IAuthProviderProps) {
  async function signIn() {
    console.log('Login efetuado')
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user: {
          name: 'Cathryn',
          avatarUrl:
            'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/545.jpg'
        }
      }}>
      {children}
    </AuthContext.Provider>
  )
}
