import { VStack, Icon, Text } from 'native-base'

import { Octicons } from '@expo/vector-icons'

import { Button } from '../../components/ui/Button'
import { Header } from '../../components/ui/Header'
import { useNavigation } from '@react-navigation/native'

export function Pools() {
  const {navigate} = useNavigation()

  function handleNavigation() {
    navigate('find')
  }
  return (
    <VStack flex={1} bg='gray.900'>
      <Header title='Meus bolões' />
      <VStack mt={6} mb={4} mx={5} pb={4} borderBottomWidth={1}>
        <Button
          title='BUSCAR BOLÃO POR CÓDIGO'
          leftIcon={
            <Icon as={Octicons} name='search' color='black' size='md' />
          }
          onPress={handleNavigation}
        />
      </VStack>
      <Text color='gray.200' fontSize='sm' textAlign='center' mt={4} px={12}>
        Você ainda não está participando de nenhum bolão, que tal buscar um por
        código ou criar um novo?
      </Text>
    </VStack>
  )
}
