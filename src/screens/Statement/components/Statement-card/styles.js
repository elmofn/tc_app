import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		padding: 16,
		borderTopLeftRadius: 8,
		borderBottomLeftRadius: 32,
		borderTopRightRadius: 32,
		borderBottomRightRadius: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
		shadowOffset: { width: 4, height: 4 },
		shadowOpacity: 0.24,
		shadowRadius: 40,
		shadowColor: '#000000',
		elevation: 8,
	},
	divider: {
		height: 74,
		width: 1,
		backgroundColor: '#19191999',
	},
	balanceContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 16,
	},
	balanceText: {
		fontSize: 18,
		lineHeight: 20,
		color: '#19191999',
	},
	balanceValue: {
		fontSize: 20,
		lineHeight: 22,
		marginTop: 8,
		marginBottom: 4,
	},
	balanceDollarValue: {
		fontSize: 16,
		lineHeight: 18,
		color: '#19191999',
	},
	infoIcon: {
		paddingLeft: 8,
	},
})
