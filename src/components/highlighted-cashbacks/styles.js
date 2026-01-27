import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		lineHeight: 32,
	},
	cardList: {
		marginTop: 12,
		gap: 12,
	},
	card: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		borderColor: '#34343433',
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 16,
		paddingVertical: 8,
		gap: 8,
		alignItems: 'center',
	},
	cardInfo: {
		gap: 8,
	},
	cardRatingContainer: {
		flexDirection: 'row',
	},
	cardRatingText: {
		fontSize: 12,
		lineHeight: 14,
		color: '#191919',
	},
	cardRatingCount: {
		fontSize: 10,
		lineHeight: 12,
		color: '#19191999',
	},
	cardChip: {
		marginLeft: 'auto',
		alignSelf: 'center',
	},
})
