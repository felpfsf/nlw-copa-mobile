import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { HStack, useToast, VStack } from 'native-base'
import { Share } from 'react-native'

import { Header } from '../../components/ui/Header'
import { Loading } from '../../components/ui/Loading'
import { api } from '../../services/api'
import { PoolCardProps } from '../../components/ui/PoolCard'
import { PoolHeader } from '../../components/ui/PoolHeader'
import { EmptyMyPoolList } from '../../components/ui/EmptyMyPoolList'
import { Option } from '../../components/ui/Option'

interface IRouteParams {
  id: string
}

export function Details() {
  const toast = useToast()
  const route = useRoute()
  const { id } = route.params as IRouteParams
  const [optionSelected, setOptionSelected] = useState<
    'Seus Palpites' | 'Ranking do grupo'
  >('Seus Palpites')
  const [isLoading, setIsLoading] = useState(true)
  const [details, setDetails] = useState<PoolCardProps>({} as PoolCardProps)

  async function fetchPoolsDetails() {
    try {
      setIsLoading(true)
      const response = await api.get(`/pools/${id}`)
      console.log(response.data.pool)
      setDetails(response.data.pool)
    } catch (error) {
      console.log(error)
      toast.show({
        title: 'Não foi possível carregar os detalhes do bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCodeShare() {
    Share.share({
      message: details.code
    })
  }

  useEffect(() => {
    fetchPoolsDetails()
  }, [id])

  if (isLoading) {
    return <Loading />
  }
  return (
    <VStack flex={1} bgColor='gray.900'>
      <Header
        title={details.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />

      {details._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PoolHeader data={details} />
          <HStack bgColor='gray.800' p={1} rounded='sm' mb={5}>
            <Option
              title='Seus palpites'
              isSelected={optionSelected === 'Seus Palpites'}
              onPress={() => setOptionSelected('Seus Palpites')}
            />
            <Option
              title='Seus palpites'
              isSelected={optionSelected === 'Ranking do grupo'}
              onPress={() => setOptionSelected('Ranking do grupo')}
            />
          </HStack>
        </VStack>
      ) : (
        <EmptyMyPoolList code={details.code} />
      )}
    </VStack>
  )
}
