import { StyleSheet } from 'react-native'

export const styles = (active) =>
	StyleSheet.create({
		title: {
			fontSize: 14,
			lineHeight: 24,
			color: active ? '#191919' : '#707A81',
		},
		card: {
			borderColor: active ? '#04B2D4' : '#191919',
			backgroundColor: active ? '#04B2D4' : '#FFFFFF',
			borderWidth: 1,
			borderRadius: 4,
			justifyContent: 'center',
			alignItems: 'center',
			padding: 8,
			width: '100%',
		},
		button: {
			width: '30%',
		}
	})
