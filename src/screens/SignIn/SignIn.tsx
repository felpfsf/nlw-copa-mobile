import { useAuth } from '../../hooks/useAuth'

import { Center, Icon, Text } from 'native-base'
import { Fontisto } from '@expo/vector-icons'

import Logo from '../../assets/logo.svg'
import { Button } from '../../components/ui/Button'

export function SignIn() {
  const { signIn, user, isUserLoading } = useAuth()
  // console.log(`User => ${user.name}, ${user.avatarUrl}`)
  return (
    <Center flex={1} bgColor='gray.900' p={7}>
      <Logo width={212} height={40} />
      <Button
        title='Entrar com o google'
        type='SECONDARY'
        mt={12}
        leftIcon={
          <Icon as={Fontisto} name='google' color={'white'} size={'md'} />
        }
        onPress={signIn}
        isLoading={isUserLoading}
        _loading={{ _spinner: { color: 'white' } }}
      />
      <Text color='gray.200' fontSize='sm' textAlign='center' mt={4}>
        Não utilizamos nenhuma informação além {'\n'} do seu e-mail para criação
        de sua conta.
      </Text>
    </Center>
  )
}
