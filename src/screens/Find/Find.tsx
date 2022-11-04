import { Heading,  VStack } from 'native-base'
import { Header } from '../../components/ui/Header'

import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

export function Find() {
  return (
    <VStack flex={1} bg={'gray.900'}>
      <Header title='Criar um novo bolão' showBackButton />
      <VStack mt={8} mx={5} alignItems='center'>
        <Heading
          fontFamily='heading'
          color='white'
          fontSize='xl'
          my={8}
          textAlign='center'>
          Encontre um bolão através de seu código único
        </Heading>
        <Input mb={2} placeholder='Qual o código do bolão?' />
        <Button title='BUSCAR BOLÃO' />
      </VStack>
    </VStack>
  )
}
