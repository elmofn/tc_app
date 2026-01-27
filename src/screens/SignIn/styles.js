import { StyleSheet } from 'react-native'
import { Platform, Dimensions } from 'react-native'
const windowHeight = Dimensions.get('window').height;
import { colors } from '../../styles'

export default StyleSheet.create({
	container: {
		flex: 1 
	},
	safeContainer: {
		flex: 1,
		paddingHorizontal: 24,
		paddingVertical: 36,
		display: 'flex',
		gap: 24,
		marginHorizontal: Platform.OS === "android" ? 0 : 24,
		height: windowHeight
	},
	header: {

	},
	headerTitle: {
		fontFamily: 'Ubuntu',
		fontSize: 24,
		fontWeight: '500',
		color: '#191919'
	},
	contentContainer: {
		flex: 1,
		alignItems: 'center',
	},
	label: {
		fontFamily: 'Red Hat Text',
		fontSize: 16,
		fontWeight: '500',
		lineHeight: 24,
		color: '#191919'
	},
	labelLogin: {
		fontSize: 16,
		marginBottom: 4,
		color: colors.textBlack,
	},
	input: {
		height: 48,
		borderWidth: 1,
		padding: 10,
		borderColor: '#707A81',
		borderRadius: 24,
	},
	signInButton: {
		borderRadius: 24,
	},
	noAccountText: {
		fontFamily: 'Ubuntu',
		fontSize: 16,
		fontWeight: '500',
		lineHeight: 24,
		color: '#05161E',
		textAlign: 'center',
	},
	forgotPasswordButton: {
		alignSelf: 'center',
		marginBottom: 24,
	},
	textLink: {
		fontFamily: 'Ubuntu',
		fontSize: 16,
		fontWeight: '500',
		lineHeight: 24,
		color: '#04B2D4',
		textDecorationLine: 'underline',
		textAlign: 'center',
	},
	textLinkBack: {
		fontFamily: 'Ubuntu',
		fontSize: 16,
		fontWeight: '500',
		lineHeight: 24,
		color: '#000',
		textDecorationLine: 'underline',
		textAlign: 'center',
	},
	bottomSheetView: {
		flex: 1,
		width: '100%',
		padding: 16,
	},
	bottomSheetHeader: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		paddingBottom: 20
	},
	bottomSheetTitle: {
		fontFamily: 'Ubuntu',
		fontSize: 24,
		fontWeight: '500',
		lineHeight: 27,
		color: '#191919'
	},
	usePasswordButton: {
		borderWidth: 1,
		borderColor: '#04B2D4',
		borderRadius: 24,
		color: '#04B2D4'
	},
	biometryImageContainer: {
		alignItems: 'center',
		marginBottom: 16,
		marginTop: 24,
	},
	biometryText :{
		textAlign: 'center',
		color: '#707A81',
		marginBottom: 24
	},
	cell: {
		width: 47,
		height: 48,
		gap: 0,
		marginHorizontal: 5,
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
})