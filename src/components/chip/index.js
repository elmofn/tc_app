import { styles } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { CustomText } from '../custom-text'
import { View } from 'react-native'

export const Chip = ({ title, icon, iconPosition, style }) => {
	return (
		<View style={{...styles.chip, ...style}}>
			{iconPosition === 'left' && (
				<FontAwesomeIcon icon={icon} color={'#fff'} size={16} />
			)}
			<CustomText
				fontWeight="normal"
				type="display"
				customStyle={styles.chipText}
			>
				{title}r
			</CustomText>
			{iconPosition === 'right' && (
				<FontAwesomeIcon icon={icon} color={'#fff'} size={16} />
			)}
		</View>
	)
}
