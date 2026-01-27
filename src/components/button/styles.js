import { StyleSheet } from 'react-native'
import { colors } from '../../styles/theme'


const stylesPerType = {
	borderRadius: {
		'Pill': 24,
		'Rounded': 8,
		'Link': 0,
	},
	paddingVertical: {
		'Pill': 12,
		'Rounded': 6,
		'Link': 0,
	},
	paddingHorizontal: {
		'Pill': 12,
		'Rounded': 12,
		'Link': 0,
	},
	fontSize: {
		'Pill': 16,
		'Rounded': 12,
		'Link': 16,
	},
	lineHeight: {
		'Pill': 24,
		'Rounded': 16,
		'Link': 23,
	},
	height: {
		'Pill': 42,
		'Rounded': 'auto',
		'Link': 'auto',
	},
	textDecorationLine: {
		'Pill': 'none',
		'Rounded': 'none',
		'Link': 'underline',
	},
}

export const styles = ({
	color,
	backgroundColor,
	type,
	borderColor,
	disabled
}) =>
	StyleSheet.create({
		button: {
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: stylesPerType.borderRadius[type],
			backgroundColor: disabled ? '#898989' : backgroundColor
				? backgroundColor
				: colors.callToActionGrey,
			overflow: 'hidden',
			paddingVertical: stylesPerType.paddingVertical[
				type
			],
			paddingHorizontal: stylesPerType.paddingHorizontal[
				type
			],
			borderColor: borderColor,
			borderWidth: borderColor ? 1 : 0,
		},
		text: {
			fontSize: stylesPerType.fontSize[type],
			lineHeight: stylesPerType.lineHeight[type],
			fontWeight: 'bold',
			letterSpacing: 0.25,
			color: color ? color : '#fff',
			textAlign: 'center',
			textDecorationLine: stylesPerType.textDecorationLine[
				type
			],
		},
		pressable: {
			width: type === 'Pill' ? '100%' : 'auto',
			height: stylesPerType.lineHeight[type],
			justifyContent: 'center',
			gap: 8,
			flexDirection: 'row',
			alignItems: 'center',
		},
	})
