import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 24,
		paddingVertical: 36,
		backgroundColor: '#FFFFFF',
		minHeight: '100%',
		gap: 16,
	},title: {
		fontSize: 16,
		lineHeight: 24,
		color: '#19191999',
		marginBottom: 16,
	},
	inputsContainer:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	customLengthInput:{
		width: '48%',
	},
	reuseCard: {
		fontSize: 14,
		lineHeight: 24,
		color: '#191919',
	},
	
})
