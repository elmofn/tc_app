import { StyleSheet } from 'react-native'
import { colors } from '../../styles'

export const styles = StyleSheet.create({
	inputContainer: {
		height: 48,
		borderWidth: 1,
		borderColor: '#707A81',
		borderRadius: 24,
		justifyContent: 'center',
	},
	label: {
		fontSize: 16,
		marginBottom: 4,
		color: colors.textBlack,
	},
})
