import AsyncStorage from '@react-native-async-storage/async-storage'


export class StorageAdapter {

	async get(key) {
		if (!this.has(key)) {
			return null
		}

		return JSON.parse(await AsyncStorage.getItem(key)) 
	}

	set(key, value) {
		AsyncStorage.setItem(key, JSON.stringify(value))
	}

	remove(key) {
		AsyncStorage.removeItem(key)
	}

	clear() {
		AsyncStorage.clear()
	}

	has(key) {
		return !!AsyncStorage.getItem(key)
	}
	
}