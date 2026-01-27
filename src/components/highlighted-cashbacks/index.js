import { Pressable, View } from 'react-native'
import { styles } from './styles'
import { CustomText } from '../../components/custom-text'
import { useTranslation } from '../../hooks'
import { HighlightedCashbacksCard } from './HighlightedCashbacksCard'

export const HighlightedCashbacks = ({
	highlights,
	setShowBottomSheet,
}) => {
	const { translate } = useTranslation('highlightedCashbacks')
	return (
		<Pressable onPress={() => setShowBottomSheet(true)}>
			<CustomText
				fontWeight="bold"
				type="display"
				customStyle={styles.title}
			>
				{translate('title')}
			</CustomText>
			<View style={styles.cardList}>
				{highlights.map((highlight, index) => (
					<HighlightedCashbacksCard key={index} {...highlight} />
				))}
			</View>
		</Pressable>
	)
}
