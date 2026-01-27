import React from 'react'
import { Image, Pressable, View, Linking } from 'react-native'
import { styles } from './styles'
import { Button, CustomText } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faVideo, faX } from '@fortawesome/free-solid-svg-icons'


import Banner from '../../assets/images/Home/concierge-bottom-sheet.png'

const ConciergeBottomSheet = ({navigation, onClose }) => {
	const handleSubmit = () => {
		onClose()
		navigation.navigate('Concierge')
	}

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
					Aqui você pode solicitar um concierge para te ajudar com o
					que precisar.
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
						onPress={() => openWhatsApp('https://wa.me/5511988167233?text=Olá%20Concierge')}
						title="WhatsApp"
						backgroundColor="#04B2D4"
						color="#000"
					/>
					<Button
						onPress={() => openCall('https://calendly.com/travelcash')}
						title="Agendar videochamada"
						backgroundColor="#E30974"
						color="#fff"
						icon={faVideo}
					/>
					<Button
						onPress={() => {
							onClose()
						}}
						title="Cancelar"
						backgroundColor="#fff"
						color="#000"
					/>
				</View>
			</View>
		</View>
	)
}

export default ConciergeBottomSheet