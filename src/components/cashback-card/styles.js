import { StyleSheet } from 'react-native'
import { useViewSize } from '../../hooks'

export const styles = StyleSheet.create({
	card: {
		height: 200,
		borderRadius: 16,
		marginVertical: 24,
		overflow: 'hidden',
		justifyContent: 'space-between',
		width: useViewSize().width * 0.9 - 24,
		
	},
	chipsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 24,
		paddingHorizontal: 24,
	},
	chip: {
		backgroundColor: '#E30974',
		alignSelf: 'flex-start',
		borderRadius: 4,
		paddingVertical: 4,
		paddingHorizontal: 8,
		flexDirection: 'row',
		gap: 4,
	},
	chipText: {
		color: '#fff',
	},
	title: {
		color: '#fff',
		fontSize: 20,
		lineHeight: 23,
	},
	subTitle: {
		color: '#fff',
		fontSize: 12,
		lineHeight: 14,
	},
	textContainer: {
		gap: 4,
	},
	ratingContainer: {
		flexDirection: 'row',
		gap: 4,
		alignItems: 'center',
		marginTop: 'auto',
	},
	ratingText: {
		color: '#fff',
		fontSize: 14,
		lineHeight: 16,
	},
	infoContainer: {
		paddingBottom: 24,
		paddingHorizontal: 24,
		paddingTop: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignContent: 'flex-end',
	},
})
