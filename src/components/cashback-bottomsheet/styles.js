import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	contentContainer: {
		paddingHorizontal: 24,
		paddingVertical: 20,
		gap: 16,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: 24,
		borderBottomColor: '#707A81',
		borderBottomWidth: 1,
	},
	title: {
		fontSize: 24,
		lineHeight: 32,
	},
	infoContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		gap: 16,
	},
	infoTitle: {
		fontSize: 16,
		lineHeight: 24,
		color: '#191919',
	},
	infoText: {
		fontSize: 16,
		lineHeight: 24,
		color: '#19191999',
		textAlign: 'center',
	},
	highlightContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#AFCA15',
		paddingVertical: 8,
		width: '100%',
		gap: 8,
		borderRadius: 4,
	},
	highlightText: {
		fontSize: 18,
		lineHeight: 20,
		color: '#000',
	},
	condition: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	conditionText: {
		fontSize: 14,
		lineHeight: 20,
		color: '#19191999',
	},
})
