import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 24,
		paddingVertical: 56,
		backgroundColor: '#FFFFFF',
		minHeight: '100%',
	},
	title: {
		fontSize: 16,
		lineHeight: 24,
		color: '#19191999',
		marginTop: 16,
	},
	pixContainer: {
		padding: 10,
		justifyContent: 'center',
	},
	pixExpirationText: {
		fontSize: 16,
		lineHeight: 24,
		color: '#707A81',
		marginBottom: 8,
		alignSelf: 'center',
	},
	pixImage: {
		width: 200,
		height: 200,
		objectFit: 'contain',
		alignSelf: 'center',
	},
	pixKeyText: {
		fontSize: 16,
		lineHeight: 18,
		color: '#707A81',
		marginTop: 8,
		marginBottom: 8,
		alignSelf: 'center',
	},
	pixKeyValue: {
		fontSize: 16,
		lineHeight: 18,
		color: '#191919',
		marginTop: 8,
		marginBottom: 8,
		alignSelf: 'center',
	},
})
