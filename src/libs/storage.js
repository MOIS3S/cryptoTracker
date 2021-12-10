import AsyncStorage from '@react-native-async-storage/async-storage'

exports.storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    console.log('storeData store error: ', e)
    return false
  }
}

exports.getData = async (key) => {
  try {
    return await AsyncStorage.getItem(key)
  } catch (e) {
    console.log('getData get error: ', e)
    throw Error(e)
  }
}

exports.getMultiple = async (keys) => {
  try {
    return await AsyncStorage.multiGet(keys)
  } catch (e) {
    console.log('getMultiple error: ', e)
    throw Error(e)
  }
}

exports.getAllKeys = async () => {
  try {
    return await AsyncStorage.getAllKeys()
  } catch (e) {
    console.log('getAllKeys error: ', e)
    throw Error(e)
  }
}

exports.removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
    return true
  } catch (e) {
    console.log('removeData get error: ', e)
    return false
  }
}
