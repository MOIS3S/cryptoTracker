import 'react-native-gesture-handler'
import { Image } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import CoinStack from './src/components/CoinStack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Colors from './src/resources/colors'
import FavoritesStack from './src/components/favorites/FavoritesStack'

const Tabs = createBottomTabNavigator()

function App () {
  return (
  <NavigationContainer>
    <Tabs.Navigator
      tabBarOptions={{
        tintColor: '#fefefe',
        style: {
          backgroundColor: Colors.blackPearl
        }
      }}
      >
      <Tabs.Screen
        name="Coins"
        component={CoinStack}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Image
              style={{ tintColor: color, width: size, height: size }}
              source={require('./assets/bank.png')}
            />
          )
        }}
        />
     <Tabs.Screen
        name="Favorites"
        component={FavoritesStack}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Image
              style={{ tintColor: color, width: size, height: size }}
              source={require('./assets/star.png')}
            />
          )
        }}
        />

    </Tabs.Navigator>
  </NavigationContainer>
  )
}

export default App
