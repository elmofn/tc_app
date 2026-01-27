import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	inputContentContainer: {},
	bottomSheetContentContainer: {
		backgroundColor: '#fff',
		padding: 16,
	},
	label: {
		fontSize: 16,
		marginBottom: 4,
		color: '#000',
	},
	optionContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 40,
		gap: 8,
		marginVertical: 4,
	},
	inputContainer: {
		height: 48,
		borderWidth: 1,
		borderColor: '#707A81',
		borderRadius: 24,
		paddingHorizontal: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	flag: {
		borderRadius: 16,
		height: 32,
		width: 32,
		overflow: 'hidden',
		backgroundColor: '#000',
	},
	flagContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
})
