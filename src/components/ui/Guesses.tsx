import { useEffect, useState } from 'react'
import {Share} from 'react-native'
import { FlatList, useToast } from 'native-base'

import { api } from '../../services/api'

import { Game, GameProps } from '../ui/Game'
import { Loading } from './Loading'
import { IError } from '../../@types/error'
import { EmptyMyPoolList } from './EmptyMyPoolList'

interface Props {
  poolId: string
  code: string
}

export function Guesses({ poolId, code }: Props) {
  const toast = useToast()

  const [isLoading, setIsLoading] = useState(true)
  const [games, setGames] = useState<GameProps[]>([])
  const [firstTeamPoints, setFirstTeamPoints] = useState('')
  const [secondTeamPoints, setSecondTeamPoints] = useState('')

  async function fetchGames() {
    try {
      setIsLoading(true)
      const response = await api.get(`/pools/${poolId}/games`)
      console.log(response.data.games)
      setGames(response.data.games)
    } catch (error) {
      console.log(error)
      toast.show({
        title: 'Ocorreu um erro Não foi possível carregar os jogos',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title: 'Informe o placar corretamente',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints)
      })

      toast.show({
        title: 'Palpite registrado com sucesso',
        placement: 'top',
        bgColor: 'greend.500'
      })

      fetchGames()
    } catch (error: unknown) {
      const err = error as IError
      console.log(err.response?.data?.message)
      toast.show({
        title: 'Não foi possível enviar o palpite',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  useEffect(() => {
    fetchGames()
  }, [poolId])

  if (isLoading) {
    return <Loading />
  }

  return (
    <FlatList
      data={games}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )}
      _contentContainerStyle={{ pb: 10 }}
      ListEmptyComponent={() => <EmptyMyPoolList code={code} />}
    />
  )
}
