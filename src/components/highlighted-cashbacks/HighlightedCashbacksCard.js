import { Image, View } from 'react-native'
import { Chip } from '../../components/chip'
import { CustomText } from '../../components/custom-text'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoins, faStar } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from '../../hooks/useTranslations'
import { styles } from './styles'

export const HighlightedCashbacksCard = ({
	cashbackPercentage,
	logoUrl,
	rating,
	ratingCount,
	title,
}) => {
	const { translate } = useTranslation('highlightedCashbacks')
	return (
		<View style={styles.card}>
			<Image source={{ uri: logoUrl }} width={52} height={52} />
			<View style={styles.cardInfo}>
				<CustomText fontWeight="bold" type="display">
					{title}
				</CustomText>
				<View style={styles.cardRatingContainer}>
					<FontAwesomeIcon icon={faStar} color="#FFB800" size={12}/>
					<CustomText fontWeight="bold" type="display" customStyle={styles.cardRatingText}>
						{rating}
					</CustomText>
					<CustomText fontWeight="normal" type="display" customStyle={styles.cardRatingCount}>
						{' '}({ratingCount} {translate('ratingCount')})
					</CustomText>
				</View>
			</View>
			<Chip
				title={`${cashbackPercentage}%`}
				iconPosition="right"
				icon={faCoins}
				style={styles.cardChip}
			/>
		</View>
	)
}
