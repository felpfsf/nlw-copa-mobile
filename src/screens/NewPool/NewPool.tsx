import { Heading, Text, VStack } from 'native-base'
import { Header } from '../../components/ui/Header'

import Logo from '../../assets/logo.svg'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

export function NewPool() {
  return (
    <VStack flex={1} bg={'gray.900'}>
      <Header title='Criar um novo bolão' />
      <VStack mt={8} mx={5} alignItems='center'>
        <Logo />
        <Heading
          fontFamily='heading'
          color='white'
          fontSize='xl'
          my={8}
          textAlign='center'>
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </Heading>
        <Input mb={2} placeholder='Qual nome do seu bolão?' />
        <Button title='CRIAR MEU BOLÃO' />
        <Text color='gray.200' fontSize='sm' textAlign='center' px={4} mt={4}>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  )
}