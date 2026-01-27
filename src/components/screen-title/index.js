import { Pressable, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { CustomText } from '../custom-text'
import { styles } from './styles'

export const ScreenTitle = ({
	title,
	navigation,
	showBackButton,
}) => {
	return (
		<View style={styles.titleContainer}>
			{showBackButton && (
				<Pressable onPress={() => navigation.goBack()}>
					<FontAwesomeIcon icon={faChevronLeft} />
				</Pressable>
			)}
			<CustomText
				fontWeight="bold"
				type="display"
				customStyle={styles.title}
			>
				{title}
			</CustomText>
		</View>
	)
}
