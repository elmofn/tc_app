import { Image, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { CustomText } from '../custom-text'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoins, faMobilePhone, faX } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../button'

export const CashbackBottomSheet = ({
	onClose,
}) => {
	return (
		<View style={styles.contentContainer}>
			<View style={styles.header}>
				<CustomText
					fontWeight="bold"
					type="display"
					customStyle={styles.title}
				>
					Cashback
				</CustomText>
				<TouchableOpacity   onPress={() => onClose()}>
					<FontAwesomeIcon icon={faX}/>
				</TouchableOpacity>
				
			</View>
			<View style={styles.infoContainer}>
				<Image />
				<CustomText
					fontWeight="bold"
					type="display"
					customStyle={styles.infoTitle}
				>
					Travelcash
				</CustomText>
				<CustomText
					fontWeight="normal"
					type="display"
					customStyle={styles.infoText}
				>
					O cashback nessa loja só é válido para viagens para a região
					do Sudeste.
				</CustomText>
				<View style={styles.highlightContainer}>
					<CustomText
						fontWeight="bold"
						type="display"
						customStyle={styles.highlightText}
					>
						10% de cashback
					</CustomText>
					<FontAwesomeIcon icon={faCoins} />
				</View>
			</View>
			<View style={styles.condition}>
				<FontAwesomeIcon icon={faMobilePhone} />
				<CustomText
					fontWeight="normal"
					type="display"
					customStyle={styles.conditionText}
				>
					O cashback nessa loja só é válido para viagens para a região
					do Sudeste.
				</CustomText>
			</View>
			<View style={styles.condition}>
				<FontAwesomeIcon icon={faMobilePhone} />
				<CustomText
					fontWeight="normal"
					type="display"
					customStyle={styles.conditionText}
				>
					O cashback nessa loja só é válido para viagens para a região
					do Sudeste.
				</CustomText>
			</View>
			<View style={styles.condition}>
				<FontAwesomeIcon icon={faMobilePhone} />
				<CustomText
					fontWeight="normal"
					type="display"
					customStyle={styles.conditionText}
				>
					O cashback nessa loja só é válido para viagens para a região
					do Sudeste.
				</CustomText>
			</View>
			<View style={styles.condition}>
				<FontAwesomeIcon icon={faMobilePhone} />
				<CustomText
					fontWeight="normal"
					type="display"
					customStyle={styles.conditionText}
				>
					O cashback nessa loja só é válido para viagens para a região
					do Sudeste.
				</CustomText>
			</View>
			<Button
				onPress={() => {}}
				title="Ativar cashback e ir para loja"
				backgroundColor="#000"
				color="#fff"
				type={'Pill'}
			/>
			<Button
				onPress={onClose}
				title="Cancelar"
				backgroundColor="#fff"
				color="#04B2D4"
				borderColor="#04B2D4"
				type={'Pill'}
			/>
		</View>
	)
}
