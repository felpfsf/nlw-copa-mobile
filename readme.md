# INSTRUÇÕES GERAIS

Projeto desenvolvido durante a NLW Copa

## Instalação

### Native Base

Native base é uma lib de componentes de estilização para React Native, sua funcionalidade é similar ao tailwind.

- [ ] `expo init my-app --template @native-base/expo-template-typescript` --> instala o native base do 0 usando o expo com template de typescript.
- [ ] `yarn add native-base` `expo install react-native-svg@12.1.1` `expo install react-native-safe-area-context@3.3.2` --> Para instalar em um projeto existente basta executar esses 3 comandos
- [ ] `yarn add --dev react-native-svg-transformer` --> SVG transform é uma lib que permite usar arquivos SVG como componentes na aplicação, precisa ter previamente instalado a lib `react-native-svg`, já vem instalada com Native Base

## AuthContext

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

## OAuth2

- [ ] `npx expo install expo-auth-session expo-random`
- [ ] `npx expo install expo-web-browser` --> abre o browser do sistema para o usuário poder efetuar o login
- [ ] `console.cloud.google.com` --> configurar um projeto e adquirir as credenciais da API do google para poder realizar a autenticação

*Tela de permissão OAuth* --> *Externo* --> Escopos `userinfo.email` e `userinfo.profile` --> *Usuário de teste(opcional)* --> *Voltar para o perfil* --> *Publicar Aplicativo*

*Credenciais* --> *Criar ID do cliente OAuth* --> *Aplicativo da Web* --> *URIs Autorizadas* `https://auth.expo.io` --> URIs de redirecionamento `https://auth.expo.io/@<username>/<projeto>`

### Para conseguir acessar a URI de redirecionamento corretamente:

- [ ] Importar *AuthSession* de `expo-auth-session`
- [ ] Dentro de *AuthContextProvider* usar o `console.log` para `makeRedirectUri({useProxy:true})`
- [ ] Ao executar a aplicação será exibido no conole o URI de redirecionamento correto

### Caso não seja possível visualizar:

- [ ] `npx expo login` --> efetuar o login utilizando seu email/username e senha da `expo.dev`
- [ ] npx expo whoami --> verificar se está logado na conta expo exibindo seu nome de usuário

Dessa forma o aplicativo vai gerar corretamente a URI de redirecionamento

Ao completar o cadastro será fornecido um ID do cliente.

#### Autenticando com o Google

- [ ] Importar *WebBrowser* de `expo-web-browser`
- [ ] Importar *Google* de `expo-auth-session/providers/google`

Iniciar a função `WebBrowser.maybeCompleAuthSession()`

Em *AuthContextProvider* usar a função `Google.useAuthRequest()` e dentro dela passar o *clientId* que é a credencial do google, em *redirectUri* a função `makeRedirectUri({useProxy:true})` e como *scopes* o que foi previamente definido, o `profile` e o `email`
