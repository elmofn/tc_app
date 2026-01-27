import { Image, Pressable, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { CustomText } from '../../../../components'
import { styles } from './styles'
import PixIcon from '../../../../assets/images/deposit/pix-icon.png'
import PixActiveIcon from '../../../../assets/images/deposit/pix-active-icon.png'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'

const PaymentMethodCard = ({
	isActive,
	type,
	onPress,
	title,
}) => {
	return (
		<Pressable onPress={onPress} style={styles(isActive).button}>
			<View style={styles(isActive).card}>
				{type === 'card' ? (
					<FontAwesomeIcon
						icon={faCreditCard}
						size={24}
						color={isActive ? '#191919' : '#707A81'}
					/>
				) : (
					<Image source={!isActive ? PixIcon : PixActiveIcon} style={{ height: 24, width: 24 }} />
				)}
				<CustomText
					fontWeight="normal"
					type="display"
					customStyle={styles(isActive).title}
				>
					{title}
				</CustomText>
			</View>
		</Pressable>
	)
}

export default PaymentMethodCard