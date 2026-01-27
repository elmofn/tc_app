import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.7)'
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 12,
		elevation: 2,
	},
	buttonClose: {
		backgroundColor: 'black',
		width: 200
	},
	buttonExclude: {
		backgroundColor: 'red',
		width: 200
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	messageText: {
		fontSize: 18,
		paddingVertical: 20,
		textAlign: 'center'
	},
});