import { StyleSheet } from 'react-native'

export default StyleSheet.create({
	pageContainer: {
		flex: 1,
	},
	scrollViewContainer: {
		paddingHorizontal: 24,
		paddingVertical: 56,
	},
	faqListContainer: {
		marginTop: 16,
		backgroundColor: 'white',
		borderTopRightRadius: 32,
		borderBottomRightRadius: 8,
		borderTopLeftRadius: 8,
		borderBottomLeftRadius: 32,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,
		elevation: 10,
	},
	faqHeader: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomColor: '#E5E5E5',
		borderBottomWidth: 1,
		paddingTop: 13,
		paddingBottom: 13,
		paddingRight: 16,
		paddingLeft: 16
	},
	faqTitle: {
		maxWidth: '90%',
		fontFamily: 'Ubuntu',
		fontSize: 14,
		fontWeight: '400',
		lineHeight: 16.09,
		textAlign: 'left',
		color: '#191919'
	},
	faqAnswerClosed: {
		padding: 0,
		maxHeight: 0,
	},
	faqAnswerOpened: {
		padding: 16,
		borderBottomColor: '#E5E5E5',
		borderBottomWidth: 1,
		maxHeight: 1500,
	},

	conciergeSection: {
		marginTop: 24,
		backgroundColor: '#fff',
		borderTopRightRadius: 32,
		borderBottomRightRadius: 8,
		borderTopLeftRadius: 8,
		borderBottomLeftRadius: 32,
		padding: 24,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,
		elevation: 10,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	conciergeBackgroundGradient: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		borderTopRightRadius: 32,
		borderBottomRightRadius: 8,
		borderTopLeftRadius: 8,
		borderBottomLeftRadius: 32,
	},
	conciergeTitle: {
		fontFamily: 'Ubuntu_700',
		fontSize: 16,
		fontWeight: '700',
		lineHeight: 18.38,
		textAlign: 'left',
		color: '#191919'
	},
	conciergeSubTitle: {
		fontFamily: 'Ubuntu',
		fontSize: 12,
		fontWeight: '400',
		lineHeight: 18,
		textAlign: 'left',
		marginTop: 8,
		maxWidth: 200
	},
	conciergeButton: {
		height: 26,
		paddingTop: 6,
		paddingBottom: 6,
		paddingRight: 8,
		paddingLeft: 8,
		borderRadius: 8,
		backgroundColor: '#fff',
		marginTop: 16,
	},
	conciergeButtonText: {
		fontFamily: 'Ubuntu_700',
		fontSize: 12,
		fontWeight: '700',
		lineHeight: 13.79,
		textAlign: 'center',
		color: '#191919',
	},
	spacer: {
		height: 100,
	},
})