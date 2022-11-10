import { useCallback, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { VStack, Icon, Text, useToast, FlatList } from 'native-base'

import { api } from '../../services/api'

import { Octicons } from '@expo/vector-icons'

import { Button } from '../../components/ui/Button'
import { Header } from '../../components/ui/Header'
import { Loading } from '../../components/ui/Loading'
import { PoolCard, PoolCardProps } from '../../components/ui/PoolCard'
import { EmptyPoolList } from '../../components/ui/EmptyPoolList'

export function Pools() {
  const { navigate } = useNavigation()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [pools, setPools] = useState<PoolCardProps[]>([])

  function handleNavigation() {
    navigate('find')
  }

  async function fetchPools() {
    try {
      setIsLoading(true)

      const response = await api.get('/pools')
      setPools(response.data.pools)
    } catch (error) {
      console.log(error)

      toast.show({
        title: 'Erro ao tentar encontrar os bolões',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchPools()
    }, [])
  )

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
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={pools}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <PoolCard
              data={item}
              onPress={() => navigate('details', { id: item.id })}
            />
          )}
          ListEmptyComponent={() => <EmptyPoolList />}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          px={5}
        />
      )}
    </VStack>
  )
}
