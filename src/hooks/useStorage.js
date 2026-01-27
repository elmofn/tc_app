import AsyncStorage from '@react-native-async-storage/async-storage'

export const useStorage = () => {
	const set = (value, key) => {
		AsyncStorage.setItem(key, value)
	}
	const get = async (key) => {
		return await AsyncStorage.getItem(key)
	}
	const remove = (key) => {
		AsyncStorage.removeItem(key)
	}

	return {
		set,
		get,
		remove,
	}
}
