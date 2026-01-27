import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	StepperContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		gap: 8,
	},
	StepperItem: {
		flexGrow: 1,
		height: 8,
		borderRadius: 8,
		backgroundColor: '#89898966',
	},
	Title: {
		fontFamily: 'Ubuntu',
		fontSize: 24,
		fontWeight: '500',
		lineHeight: 32,
		color: '#191919',
	},
	SubTitle: {
		fontFamily: 'Ubuntu',
		fontSize: 16,
		fontWeight: '400',
		lineHeight: 24,
		color: '#19191999',
	},
	StepperCounter: {
		fontFamily: 'Red Hat Text',
		fontSize: 16,
		fontWeight: '500',
		lineHeight: 21,
		color: '#191919',
		textAlign: 'right',
	},
})

export const stepperStyles = (active) =>
	StyleSheet.create({
		StepperItem: {
			flexGrow: 1,
			height: 8,
			borderRadius: 8,
			backgroundColor: active ? '#04B2D4' : '#89898966',
		},
	})
