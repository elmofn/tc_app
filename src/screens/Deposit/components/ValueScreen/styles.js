import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 24,
		paddingVertical: 36,
		backgroundColor: '#FFFFFF',
		minHeight: '100%',
	},
	paymentMethodsTitle: {
		fontSize: 16,
		lineHeight: 24,
		marginTop: 32,
	},
	paymentMethodsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 8,
	},
	title: {
		fontSize: 16,
		lineHeight: 24,
		color: '#19191999',
		marginTop: 16,
	},
	valuesContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		gap: 8,
		marginTop: 32,
		marginBottom: 16,
	},
	button: {
		width: '100%',
		marginTop: 32,
	},
})
