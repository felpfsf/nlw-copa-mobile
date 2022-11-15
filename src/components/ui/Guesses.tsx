import { useEffect, useState } from 'react'
import { FlatList, useToast } from 'native-base'

import { api } from '../../services/api'

import { Game, GameProps } from '../ui/Game'

interface Props {
  poolId: string
}

export function Guesses({ poolId }: Props) {
  const toast = useToast()
  const [games, setGames] = useState<GameProps[]>([])
  const [firstTeamPoints, setFirstTeamPoints] = useState('')
  const [secondTeamPoints, setSecondTeamPoints] = useState('')
  const [isLoading, setIsLoading] = useState(true)

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
        toast.show({
          title: 'Informe o placar corretamente',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      await api.post(`/pools/${poolId}}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints)
      })

      toast.show({
        title: 'Palpite registrado com sucesso',
        placement: 'top',
        bgColor: 'greend.500'
      })
      
    } catch (error) {
      console.log(error)
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

  return (
    <FlatList
      data={games}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => {}}
        />
      )}
    />
  )
}
