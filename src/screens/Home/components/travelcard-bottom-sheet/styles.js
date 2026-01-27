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
	termsAndConditionsContainer: {
		height: 200,
		overflow: 'scroll',
	},
	termsAndConditionsText: {
		fontSize: 16,
		lineHeight: 24,
		color: '#19191999',
	},
	inputContainer: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		flexDirection: 'row',
		alignContent: 'center',
		borderWidth: 1,
		borderColor: '#707A81',
		justifyContent: 'space-between',
		gap: 16,
		marginVertical: 24,
	},
	inputText: {
		fontSize: 14,
		lineHeight: 20,
		color: '#19191999',
		flex: 1,
	},
})
