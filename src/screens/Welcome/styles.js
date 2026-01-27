import { StyleSheet } from 'react-native'

// Opção 2
export default StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor:
      'linear-gradient(0deg, #191919, #191919), linear-gradient(178.28deg, rgba(255, 255, 255, 0) 50.59%, rgba(10, 10, 12, 0.9) 65.24%)',
	},
	backgroundImage: {
		flex: 1,
		justifyContent: 'center',
	},
	appLogo: {
		marginTop: 64,
	},
	contentContainer: {
		marginBottom: 48,
		width: '90%',
	},
	title: {
		color: '#fff',
		fontFamily: 'Ubuntu_700',
		fontSize: 24,
		fontWeight: '700',
		lineHeight: 27,
		textAlign: 'center',
		marginBottom: 8,
	},
	subTitle: {
		color: '#fff',
		// fontFamily: 'Ubuntu',
		fontSize: 18,
		fontWeight: '500',
		lineHeight: 24,
		textAlign: 'center',
	},
	buttonsWrapper: {
		display: 'flex',
		flexDirection: 'column',
		gap: 8,
		marginTop: 16,
	},
	button: {
		borderRadius: 24,
	},
	signUpButton: {
		backgroundColor: '#04B2D4',
	},
	accountActivationButton: {
		backgroundColor: '#FFF',
	},
	signInButton: {
		backgroundColor: '#000',
	},
})
