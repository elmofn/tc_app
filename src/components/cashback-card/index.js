import { ImageBackground, Pressable, View } from 'react-native'
import { styles } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlane, faCoins, faStar } from '@fortawesome/free-solid-svg-icons'
import { Chip } from '../../components/chip'
import { CustomText } from '../../components/custom-text'
import { BlurView } from 'expo-blur'

export const CashbackCard = ({ setShowBottomSheet }) => {
	return (
		<Pressable
			onPress={() => {
				setShowBottomSheet(true)
			}}
		>
			<ImageBackground
				source={require('../../assets/images/cashbackCardBackground.jpeg')}
				style={styles.card}
			>
				<View style={styles.chipsContainer}>
					<Chip title="Viagens" icon={faPlane} iconPosition="left" />
					<Chip title="10%" icon={faCoins} iconPosition="right" />
				</View>
				<BlurView
					intensity={20}
					tint="dark"
					style={styles.infoContainer}
				>
					<View style={styles.textContainer}>
						<CustomText
							fontWeight="bold"
							type="display"
							customStyle={styles.title}
						>
							Capitólio
						</CustomText>
						<CustomText
							fontWeight="normal"
							type="display"
							customStyle={styles.subTitle}
						>
							Clube Gold Turismo
						</CustomText>
					</View>
					<View style={styles.ratingContainer}>
						<FontAwesomeIcon
							icon={faStar}
							color={'#FFB800'}
							size={14}
						/>
						<CustomText
							fontWeight="normal"
							type="display"
							customStyle={styles.ratingText}
						>
							4,2
						</CustomText>
					</View>
				</BlurView>
			</ImageBackground>
		</Pressable>
	)
}
