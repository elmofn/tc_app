import { Dimensions } from 'react-native'

export const useViewSize = () => {
	const width = Dimensions.get('window').width - 32 // 16 padding left and right
	const height = Dimensions.get('window').height

	return {
		width,
		height,
	}
}
