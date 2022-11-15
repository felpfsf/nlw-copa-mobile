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

### Para conseguir acessar a URI de redirecionamento corretamente

- [ ] Importar *AuthSession* de `expo-auth-session`
- [ ] Dentro de *AuthContextProvider* usar o `console.log` para `makeRedirectUri({useProxy:true})`
- [ ] Ao executar a aplicação será exibido no conole o URI de redirecionamento correto

### Caso não seja possível visualizar

- [ ] `npx expo login` --> efetuar o login utilizando seu email/username e senha da `expo.dev`
- [ ] npx expo whoami --> verificar se está logado na conta expo exibindo seu nome de usuário

Dessa forma o aplicativo vai gerar corretamente a URI de redirecionamento

Ao completar o cadastro será fornecido um ID do cliente.

#### Autenticando com o Google

- [ ] Importar *WebBrowser* de `expo-web-browser`
- [ ] Importar *Google* de `expo-auth-session/providers/google`

Iniciar a função `WebBrowser.maybeCompleAuthSession()`

Em *AuthContextProvider* usar a função `Google.useAuthRequest()` e dentro dela passar o *clientId* que é a credencial do google, em *redirectUri* a função `makeRedirectUri({useProxy:true})` e como *scopes* o que foi previamente definido, o `profile` e o `email`

## Phosphor React Native Icons

- [ ] `yarn add phosphor-react-native` / `npm install --save phosphor-react-native`

## React Navigation (reactnavigation.org)

- [ ] `yarn add @react-navigation/native` => core de navegação
- [ ] `npx expo install react-native-screens react-native-safe-area-context` => dependências de projeto usando o expo
- [ ] `yarn add @react-navigation/bottom-tabs`

Cria um arquivo condensando as rotas do aplicativo, app.routes.tsx, e em index.tsx é passado a função AppRoutes

Para manter a rota de Encontrar um Bolão(Find) precisa adicionar uma nova screen porém para não acrescentar um  novo botão/elemento tem que colocar a options tabBarButton com retorno null, assim não exibe o botão mas mantém a rota.

## Autenticando com o google

Em AuthContxt na função **`signInWithGoogle`** utiliza um bloco **`try-catch`**, em primeiro é passado o estado de *loading* para true como um feedback para o usuário, enquanto isso através do método *`post`* usando a rota **`/users`** é requisitado o token de resposta, esse token servirá para identificar o usuário está autenticado na aplicação.

Através do método defaults o token de acesso é concedido e e aplicado ao cabeçalho da requisição mantendo o usuário autenticado.

```js
api.defaults.headers.common['Authorization'] = `Bearer ${tokenRespose.data}`
```

Com suscesso é feito a recuperação dos dados do usuário, no caso apenas o nome e o avatar, através da rota **`/me`** e armazenados no estado **`user`**

Após o login é preciso redirecionar o usuário para as rotas do app então no index de routes é feita uma condição utilizando o **`user`** do hook **`useAuth`**, caso tenha um nome de usuário então significa que o usuário está logado no app e redireciona para o menu

## Criando um bolão

Criar uma função assincrona com método **`post`** para lidar com a criação de palpites, essa função primeiramente verifica se o input está vazio através do estado criado para o valor do input. O **`toast`** é uma lib do **`native-base`** que serve para exibir uma mensagem de alerta mais customizada ao usuário.

Em um bloco **`try-catch`** é postado o título do bolão, caso ocorra algum erro é exibido uma mensagem para o usuário. Para um feedback visual adicona um estado de loading ao botão e um ícone enquanto a operação é efetuada.

## Listando os bolões

Para listar os bolões do usuário é realizada uma requisição **`get`** no endpoint **`/pools`**, a resposta é armazenada em um estado que então é passado para o componente **`PoolCard`**.

O componente de **`FlatList`** é utilizado para fazer um *map* da requisição e renderizar os itens, no método **`renderItem`** é passado o componente **`PoolCard`** e em **`ListEmptyComponent`** é passado o componente **`EmpytPoolList`** que contém uma mensagem informando que o usuário não possui nenhum bolão.

Para dar feedback ao usuário é feita uma condição para exibir um ícone de *loading* enquanto o app faz a requisição.

## Entrando em um bolão por código

É feita uma consulta do código oferecido pelo usuário, em caso de sucesso é exibida uma mensagem toast de sucesso e redireciona o usuário para tela de bolões cadastrados. Em caso de erro é feita uma comparação com a mensagem do status de erro vindo do servidor e então é exibida a mensagem para o usuário, uma terceira mensagem de erro é criada para tratar qualquer outro tipo de erro.

## Exibindo detalhes do bolão

Ao clicar no card do bolão é passado seu **`id`** como parâmetro, com ele é possível fazer a requisição de detalhes através da rota **`/pools/id`**, no *`useEffect`* é utilizado o parâmetro **`id`** como referência para atualizar a página e fazer uma nova requisição. O componente **`PoolHeader`** recebe os dados da requisição para exibir o *`nome`*, *`codigo do bolão`*, os *`avatares`* e a *`quantidade total de usuários`*.

Uma condição é criada para o caso de não existir ninguém no bolão, dando lugar a uma mensagem para o usuário compartilhar o link.

O compartilhamento do link é feito através da lib **`Share`** nativa do próprio **`react-native`**, através dela tem o método **`share`** no qual possui um objeto que no caso será uma message contendo o codigo do bolão.

A listagem de jogos do bolão é feita através do componente **`Guesses`**, este recebe o *`poolId`* como parâmetro que é usado para acessar a rota da API contendo os jogos relacionado ao bolão selecionado. Cada jogo é renderizado no componente **`Game`** através de uma *`FlatList`*.

O componente **`Game`** tem como parametros o placar do jogo e caso o usuário não tenha feito um palpite ainda um botão de confirmar palpite é exibido.

## Registrando o palpite

Para efetuar o registro do palpite é criada uma função assíncrona com o **`gameId`** como parâmetro para ser usado na rota da API *`/pools/${poolId}/games/${gameId}/guesses`*. No método *post* é passado a rota da API com o *`poolId`* e o *`gameId`* seguido pelo placar do palpite. Em caso de sucesso uma mensagem exibida e a função fetchGames é chamada novamente, atualizando a lista de jogos do bolão.

A lib Day.js é utilizada para tratar o formato de data que está registrado no backend.
