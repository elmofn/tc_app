import { styles } from './styles'
import { Image, Pressable, View, Linking } from 'react-native'
import { CustomText } from '../../../../components'
import { Button } from './components/button'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faVideo, faX } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { useTranslation } from '../../../../hooks'

import Banner from '../../../../assets/images/Home/concierge-bottom-sheet.png'

export const ConciergeBottomSheet = ({
	navigation,
	onClose,
}) => {
	const { translate } = useTranslation('conciergeBottomSheet')

	const openWhatsApp = async(url) => {
		await Linking.openURL(url);
	}

	const openCall = async(url) => {
		// Checking if the link is supported for links with custom URL scheme.
		const supported = await Linking.canOpenURL(url);
	
		if (supported) {
			// Opening the link with some app, if the URL scheme is "http" the web link should be opened
			// by some browser in the mobile
			await Linking.openURL(url);
		} else {
			console.log(`Don't know how to open this URL: ${url}`);
		}
	}

	return (
		<View style={styles.contentContainer}>
			<View style={styles.header}>
				<CustomText
					fontWeight="bold"
					type="display"
					customStyle={styles.title}
				>
					Concierge
				</CustomText>
				<Pressable onPress={onClose}>
					<FontAwesomeIcon icon={faX} />
				</Pressable>
			</View>
			<View style={styles.mainContent}>
				<CustomText
					type="display"
					fontWeight="normal"
					customStyle={styles.text}
				>
					{translate('conciergeTitle')}
				</CustomText>
				<Image source={Banner} style={styles.image} />
				<View style={styles.buttonsContainer}>
					{/* <Button
						onPress={() => {
							handleSubmit()
						}}
						title="Chat"
						backgroundColor="#AFCA15"
						color="#000"
						icon={faComment}
					/> */}
					<Button
						onPress={() => openWhatsApp(`https://wa.me/5511988167233?text=${translate('conciergeMessage')}!`)}
						title="WhatsApp"
						backgroundColor="#04B2D4"
						color="#000"
						icon={faWhatsapp}
					/>
					<Button
						onPress={() => openCall('https://calendly.com/travelcash')}
						title={translate('schedule')}
						backgroundColor="#E30974"
						color="#fff"
						icon={faVideo}
					/>
					<Button
						onPress={() => { onClose()}}
						title={translate('cancel')}
						backgroundColor="#fff"
						color="#000"
					/>
				</View>
			</View>
		</View>
	)
}
