import { Heading, Text, useToast, VStack } from 'native-base'
import { Header } from '../../components/ui/Header'

import Logo from '../../assets/logo.svg'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useState } from 'react'
import { Alert } from 'react-native'
import { api } from '../../services/api'

export function NewPool() {
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  async function handleCreatePool() {
    if (!title.trim()) {
      return toast.show({
        title: 'Informe um título para o seu bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
    }

    try {
      setIsLoading(true)
      await api.post('/pools', { title })

      toast.show({
        title: 'Bolão criado com sucesso',
        placement: 'top',
        bgColor: 'green.500'
      })

      setTitle('')
    } catch (error) {
      console.log(error)
      toast.show({
        title: 'Não foi possível criar o bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }
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
        <Input
          mb={2}
          placeholder='Qual nome do seu bolão?'
          onChangeText={setTitle}
          value={title}
        />
        <Button
          title='CRIAR MEU BOLÃO'
          onPress={handleCreatePool}
          isLoading={isLoading}
          _loading={{ _spinner: { color: 'white' } }}
        />
        <Text color='gray.200' fontSize='sm' textAlign='center' px={4} mt={4}>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  )
}
