import { useState } from 'react'
import { Heading, useToast, VStack } from 'native-base'

import { api } from '../../services/api'

import { Header } from '../../components/ui/Header'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useNavigation } from '@react-navigation/native'

interface IError {
  error: unknown
  response: {
    data: {
      message: string
    }
  }
}
export function Find() {
  const toast = useToast()
  const { navigate } = useNavigation()
  const [isLoading, setIsloading] = useState(false)
  const [code, setCode] = useState('')

  async function handleJoinPool() {
    try {
      setIsloading(true)

      if (!code.trim()) {
        setIsloading(false)

        return toast.show({
          title: 'Informe o código do bolão',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      await api.post('pools/join', { code })

      toast.show({
        title: 'Você entrou no bolão com sucesso',
        placement: 'top',
        bgColor: 'green.500'
      })
      setCode('')
      setIsloading(false)
      navigate('pools')
      
    } catch (error: unknown) {
      const err = error as IError
      console.log(err.response?.data?.message)
      setIsloading(false)

      if (err.response?.data?.message === 'Bolão não encontrardo') {
        return toast.show({
          title: 'Bolão não encontrardo',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      if (err.response?.data?.message === 'Você já participa deste bolão') {
        return toast.show({
          title: 'Você já participa deste bolão',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      toast.show({
        title: 'Erro ao encontrar o bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

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
        <Input
          mb={2}
          placeholder='Qual o código do bolão?'
          autoCapitalize='characters'
          onChangeText={setCode}
          value={code}
        />
        <Button
          title='BUSCAR BOLÃO'
          onPress={handleJoinPool}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  )
}
