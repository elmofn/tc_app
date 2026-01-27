import { StyleSheet } from 'react-native'
import { colors } from '../../styles'

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
	title: {
		fontSize: 24,
		lineHeight: 32,
		marginVertical: 16,
		color: colors.textBlack,
	},
	subTitle: {
		fontSize: 16,
		lineHeight: 24,
		marginBottom: 32,
		color: colors.textGrey,
	},
	inputContainer: {
		gap: 16,
		marginBottom: 32,
	},
	Wrapper: {
		paddingHorizontal: 24,
		paddingTop: 36,
	},
	labelLogin: {
		fontSize: 16,
		marginBottom: 4,
		color: colors.textBlack,
	},
})
