import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 24,
		gap: 16,
		paddingTop: 56,
		paddingHorizontal: 24,
		overflow: 'visible',
	},
	title: {
		fontSize: 24,
		lineHeight: 28,
		color: '#191919',
	},
	transactionList: {},
	transactionListContent: {
		borderTopRightRadius: 32,
		borderBottomRightRadius: 8,
		borderTopLeftRadius: 8,
		borderBottomLeftRadius: 32,
		overflow: 'hidden',
		shadowColor: '#000',
		shadowOffset: { width: 4, height: 4 },
		shadowOpacity: 0.24,
		shadowRadius: 40,
		elevation: 6,
	},
	transactionListContentLoading: {
		borderTopRightRadius: 32,
		borderBottomRightRadius: 8,
		borderTopLeftRadius: 8,
		borderBottomLeftRadius: 32,
		overflow: 'hidden',
		shadowColor: '#000',
		shadowOffset: { width: 4, height: 4 },
		shadowOpacity: 0.24,
		shadowRadius: 40,
		elevation: 6,
		justifyContent: 'center',
		alignItems: 'center'
	},
	scrollContainer: {
		overflow: 'visible',
		gap: 24,
		paddingHorizontal: 24,
		paddingBottom: 32,
	},
})
