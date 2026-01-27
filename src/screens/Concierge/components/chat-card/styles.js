import { StyleSheet } from 'react-native'

export const styles = ({ type }) =>
	StyleSheet.create({
		container: {
			flexDirection: type === 'concierge' ? 'row' : 'row-reverse',
			alignItems: 'flex-end',
			maxWidth: '80%',
			alignSelf: type === 'concierge' ? 'flex-start' : 'flex-end',
			marginBottom: 32,
		},
		messageContainer: {
			backgroundColor: type === 'concierge' ? '#E2E3EA' : '#025996',
			padding: 16,
			borderTopLeftRadius: 8,
			borderTopRightRadius: 8,
			borderBottomLeftRadius: type === 'user' ? 8 : 0,
			borderBottomRightRadius: type === 'user' ? 0 : 8,
		},
		triangle: {
			width: 0,
			height: 0,
			borderTopColor: 'transparent',
			borderRightColor: type === 'user' ? '#fff' : '#E2E3EA',
			borderLeftColor: type === 'concierge' ? '#fff' : '#025996',
			borderBottomColor: type === 'concierge' ? '#E2E3EA' : '#025996',
			borderWidth: 6,
		},
		message: {
			fontSize: 14,
			lineHeight: 20,
			color: type === 'concierge' ? '#000' : '#fff',
		},
		time: {
			fontSize: 9,
			lineHeight: 10,
			color: type === 'concierge' ? '#000' : '#fff',
			alignSelf: 'flex-end',
			marginTop: 8,
		},
	})
