import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, ActivityIndicator, Pressable, StyleSheet } from 'react-native'
import { get } from '../libs/http'
import CoinsItem from './CoinsItem'
import CoinSearch from './CoinSearch'
import Colors from '../resources/colors'

const CoinsScreen = (props) => {
  const [coins, setCoins] = useState([])
  const [allCoins, setAllCoins] = useState([])
  const [loading, setLoading] = useState(false)

  const getCoins = async () => {
    const response = await get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest')
    setCoins(response.data)
    setAllCoins(response.data)
    setLoading(false)
    return response
  }

  useEffect(() => {
    setLoading(true)
    getCoins()
  }, [])

  const handlePress = (coin) => {
    props.navigation.navigate('CoinDetail', { coin })
  }

  const handleSearch = (query) => {
    query = query.toLowerCase()
    const coinsFiltered = allCoins.filter((coin) => {
      return coin.name.toLowerCase().includes(query) ||
             coin.symbol.toLowerCase().includes(query)
    })
    setCoins(coinsFiltered)
  }

  return (
    <View style={ styles.container }>
      <CoinSearch onChange={handleSearch} />
			{loading
			  ? <ActivityIndicator
					style={styles.loader}
					color="#fff"
					size="large" />
			  : null
			}
			<FlatList
				data={coins}
				renderItem={({ item }) =>
				<CoinsItem item={item} onPress={() => handlePress(item)} />
					}
				/>
		</View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade
  },
  btn: {
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 16
  },
  loader: {
    marginTop: 60
  }
})

export default CoinsScreen
