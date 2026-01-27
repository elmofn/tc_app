import { StyleSheet } from 'react-native'
import { colors } from '../../../../styles'

export const styles = StyleSheet.create({
	titleSection: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		gap: 16,
	},
	goBackCallToAction: {
		flex: 0,
	},
	goBackIcon: {
		height: 18,
		width: 12,
		objectFit: 'contain',
	},
	title: { fontSize: 24, marginVertical: 16 },
	subTitle: {
		fontSize: 16,
		marginBottom: 32,
		color: '#19191999',
	},
	cell: {
		width: 47,
		height: 48,
		gap: 0,
		borderRadius: 12,
		lineHeight: 38,
		fontSize: 24,
		borderWidth: 2,
		borderColor: colors.borderGrey,
		textAlign: 'center',
	},
	focusCell: {
		borderColor: '#000',
	},
	button: {
		marginTop: 32,
	},
})
