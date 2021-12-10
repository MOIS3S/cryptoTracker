import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, Pressable, FlatList, SectionList, Alert } from 'react-native'
import Colors from '../resources/colors'
import { get } from '../libs/http'
import CoinMarketItem from './CoinMarketItem'
import { storeData, removeData, getData } from '../libs/storage'

function CoinDetailScreen (props) {
  const [markets, setMarkets] = useState()
  const [isFavorite, setFavorite] = useState(false)
  const { coin } = props.route.params

  const getSymbolIcon = (name) => {
    if (name) {
      const symbol = name.toLowerCase().replace(' ', '-')
      return `https://i-invdn-com.akamaized.net/ico_flags/80x80/v32/${symbol}.png`
    }
  }

  const toogleFavorites = () => {
    if (isFavorite) {
      removeFavorite()
    } else {
      addFavorite()
    }
  }

  const addFavorite = async () => {
    const value = JSON.stringify(coin)
    const key = `favorite-${coin.id}`
    const stored = storeData(key, value)
    console.log('stored: ', stored)
    if (stored) {
      setFavorite(true)
    }
  }

  const removeFavorite = async () => {
    Alert.alert('Remove favorite', 'Are you sure!', [
      {
        text: 'cancel',
        onPress: () => {},
        style: 'cancel'
      },
      {
        text: 'Remove',
        onPress: async () => {
          const key = `favorite-${coin.id}`
          await removeData(key)
          setFavorite(false)
        },
        style: 'destructive'
      }
    ])
  }

  const getFavorite = async () => {
    try {
      const key = `favorite-${coin.id}`
      const favStr = await getData(key)
      console.log('fav', favStr)
      if (favStr) {
        setFavorite(true)
      }
    } catch (e) {
      console.log('get favorite error: ', e)
    }
  }

  const getSections = (coin) => {
    const sections = [
      {
        title: 'Market cap',
        data: [coin.quote.USD.market_cap]
      },
      {
        title: 'Volumen 25h',
        data: [coin.quote.USD.volume_24h]
      },
      {
        title: 'Change 24h',
        data: [coin.quote.USD.percent_change_24h]
      }
    ]
    return sections
  }

  const getMarkets = async (coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`
    const response = await get(url)
    setMarkets(response)
  }
  
  useEffect(() => {
    props.navigation.setOptions({ title: coin.symbol })
    getMarkets(coin.id)
    getFavorite()
  }, [])
  return (
  <View style={styles.container}>
    <View style={styles.subHeader}>
      <View style={styles.row}>
        <Image style={styles.iconImg} source={{ uri: getSymbolIcon(coin.name) }}/>
        <Text style={styles.titleText}>{ coin.name }</Text>
      </View>
        <Pressable
          onPress={toogleFavorites}
          style={[
            styles.btnFavorite,
            isFavorite
              ? styles.btnFavoriteRemove
              : styles.btnFavoriteAdd
          ]}>
        <Text style={styles.btnFavoriteText}>{ isFavorite ? 'Remove favorites' : 'Add favorites'}</Text>
      </Pressable>
    </View>
    <SectionList
      style={styles.section}
      sections={getSections(coin)}
      keyExtractor={(item) => item}
      renderItem={({ item }) =>
        <View style={styles.sectionItem}>
          <Text style={styles.itemText}>{item}</Text>
        </View>
      }
      renderSectionHeader={({ section }) =>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{section.title}</Text>
          </View>
      }
     />
    <Text style={styles.marketsTitle}>Markets</Text>
    <FlatList
      style={styles.list}
      horizontal={true}
      data={markets}
      renderItem={({ item }) => <CoinMarketItem item={item} />}
    />
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade
  },
  row: {
    flexDirection: 'row'
  },
  subHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8
  },
  iconImg: {
    width: 25,
    height: 25
  },
  section: {
    maxHeight: 220
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0, 0.2)',
    padding: 8
  },
  sectionItem: {
    padding: 8
  },
  itemText: {
    color: Colors.white,
    fontSize: 14
  },
  sectionText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold'
  },
  marketsTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 16
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8
  },
  btnFavoriteText: {
    color: Colors.white
  },
  btnFavoriteAdd: {
    backgroundColor: Colors.picton
  },
  btnFavoriteRemove: {
    backgroundColor: Colors.carmine
  }
})
export default CoinDetailScreen
