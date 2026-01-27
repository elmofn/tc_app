import { StyleSheet, Dimensions } from 'react-native'

const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
		paddingHorizontal: 24,
		paddingTop: 56,
		backgroundColor: '#fff',
		height: height,
		
	},
	tabLabelContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8
	},
	tabLabelText: {
		fontSize: 14,
		lineHeight: 16,
	},
})
