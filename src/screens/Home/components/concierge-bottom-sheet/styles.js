import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	contentContainer: {
		paddingHorizontal: 24,
		paddingVertical: 20,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: 24,
		marginBottom: 24,
		borderBottomColor: '#191919',
		borderBottomWidth: 1,
		alignItems: 'center',
	},
	title: {
		fontSize: 24,
		lineHeight: 32,
	},
	text: {
		fontSize: 16,
		lineHeight: 24,
		color: '#19191999',
	},
	image: {
		width: 238,
		height: 248,
	},
	mainContent: {
		alignItems: 'center',
		gap: 32,
	},
	buttonsContainer: {
		width: '100%',
		gap: 12,
	},
})
