# INSTRUÇÕES GERAIS

Projeto desenvolvido durante a NLW Copa

## Instalação

### Native Base

Native base é uma lib de componentes de estilização para React Native, sua funcionalidade é similar ao tailwind.

- [ ] `expo init my-app --template @native-base/expo-template-typescript` => instala o native base do 0 usando o expo com template de typescript.
- [ ] `yarn add native-base` `expo install react-native-svg@12.1.1` `expo install react-native-safe-area-context@3.3.2` => Para instalar em um projeto existente basta executar esses 3 comandos
- [ ] `yarn add --dev react-native-svg-transformer` => SVG transform é uma lib que permite usar arquivos SVG como componentes na aplicação, precisa ter previamente instalado a lib `react-native-svg`, já vem instalada com Native Base


AuthContext

Contexto criado para gerenciar o login de usuários no app. Ele é acessado por meio de um um custom Hook

```js
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
```

Nesse exemplo a função `AuthContextProvider` vai gerenciar a autenticação do usuário retornando os dados do usuário que efetuou o login.

A função `signIn` é responsável por realizar o método de autenticação
