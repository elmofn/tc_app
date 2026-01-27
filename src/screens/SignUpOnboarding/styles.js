import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
	container: {
		paddingTop: 36,
		backgroundColor: '#fff',
		height: '100%',
	},
	logo: {
		height: 40,
		width: 'auto',
		objectFit: 'contain',
	},
	banner: {
		height: width * (height > 592 ? 1 : 0.7),
		width: width * 0.9 * 0.90,
		alignSelf: 'center',
		objectFit: 'contain',
	},
	textContainer: {
		paddingHorizontal: 24,
		justifyContent: 'space-evenly',
		flex: 1
	},
	title: {
		textAlign: 'center',
		fontSize: 24,
		lineHeight: 27.5,
	},
	subTitle: {
		textAlign: 'center',
		fontSize: 18,
		lineHeight: 24,
		color: '#19191999',
	},
})
