import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: 16,
		backgroundColor: '#fff',
		gap: 12,
		borderBottomWidth: 1,
		borderColor: '#1919194D',
	},
	title: {
		fontSize: 14,
		lineHeight: 16,
		color: '#19191999',
	},
	description: {
		fontSize: 14,
		lineHeight: 16,
		color: '#191919',
	},
	date: {
		fontSize: 14,
		lineHeight: 16,
		color: '#19191999',
		textAlign: 'right',
	},
	balance: {
		fontSize: 14,
		lineHeight: 16,
		color: '#191919',
		textAlign: 'right',
	},
	balanceDollar: {
		fontSize: 10,
		lineHeight: 11,
		color: '#191919',
		textAlign: 'right',
	},
	balanceContainer: {
		marginLeft: 'auto',
		flex: 4
	},
	containerTitle: {
		flex: 8
	},
	infoIcon: {
		marginLeft: 8,
	},
})

export const iconStyles = (type) =>
	StyleSheet.create({
		icon: {
			height: 36,
			width: 36,
			borderRadius: 50,
			backgroundColor:
				type === "credit"
					? '#AFCA0B'
					: type === "debit"
					? '#E30074'
					: '#04B2D4',
			alignItems: 'center',
			justifyContent: 'center',
		},
	})
