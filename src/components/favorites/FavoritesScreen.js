import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, AppState } from 'react-native'
import FavoritesEmptyState from './FavoritesEmptyState'
import CoinsItem from '../CoinsItem'
import Colors from '../../resources/colors'
import { getAllKeys, getMultiple } from '../../libs/storage'

const FavoritesScreen = (props) => {
  console.log(props.navigation)
  const [favorites, setFavorites] = useState([])
  const getFavorites = async () => {
    try {
      const allKeys = await getAllKeys()
      const keys = allKeys.filter((key) => key.includes('favorite-'))
      const favs = await getMultiple(keys)
      const favorites = favs.map(fav => JSON.parse(fav[1]))
      setFavorites(favorites)
    } catch (e) {
      console.log('get favorites error: ', e)
    }
  }

  useEffect(() => {
    props.navigation.addListener('focus', getFavorites)
    return () => props.navigation.removeListener('focus', getFavorites)
  }, [])

  const handlePress = (coin) => {
    props.navigation.navigate("CoinDetail", { coin })
  }

  return (
  <View style={styles.container}>
    {
      favorites.length === 0 ? <FavoritesEmptyState /> : null
    }
    {
      favorites.length > 0 ? 
      <FlatList data={favorites} renderItem={({ item }) => (
	    <CoinsItem item={item} onPress={() => handlePress(item)} />
      )} 
      /> 
      : null
    }
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.charade,
    flex: 1
  }
})

export default FavoritesScreen
