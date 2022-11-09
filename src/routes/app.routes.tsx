import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NewPool } from '../screens/NewPool/NewPool'
import { Pools } from '../screens/Pools/Pools'

import { PlusCircle, SoccerBall } from 'phosphor-react-native'

import { useTheme } from 'native-base'
import { Platform } from 'react-native'
import { Find } from '../screens/Find/Find'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  const { colors, sizes } = useTheme()
  const size = sizes[6]
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          position: 'absolute',
          height: 87,
          borderTopWidth: 0,
          backgroundColor: colors.gray[800]
        },
        tabBarItemStyle: {
          position: 'relative',
          top: Platform.OS === 'android' ? -10 : 0
        }
      }}>
      <Screen
        name='new'
        component={NewPool}
        options={{
          tabBarIcon: ({ color }) => <PlusCircle color={color} size={size} />,
          tabBarLabel: 'Novo Bolão'
        }}
      />
      <Screen
        name='polls'
        component={Pools}
        options={{
          tabBarIcon: ({ color }) => <SoccerBall color={color} size={size} />,
          tabBarLabel: 'Meus Bolões'
        }}
      />
      <Screen
        name='find'
        component={Find}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  )
}
