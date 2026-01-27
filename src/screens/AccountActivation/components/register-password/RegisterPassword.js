import React, { useEffect, useState } from 'react'
import { Pressable, View, BackHandler, Text } from 'react-native'
import { CustomText, Button } from '../../../../components'
import OtpInputCode from '../../../../components/otp-input-code'
import { styles } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import ComponentModal from '../../../../components/modal'
import { useTranslation } from '../../../../hooks'

const CELL_COUNT = 4

export const RegisterPassword = ({ navigation, onGoBack, onSubmit, loading }) => {
	const [modalVisible, setModalVisible] = useState(false)
	const [message, setMessage] = useState({ message: '', title: '' })
	const [password, setPassword] = useState('')
	const [passwordVerification, setPasswordVerification] = useState('')

	const { translate } = useTranslation('setActivationPasswordScreen')

	useEffect(() => {
		const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
			if (navigation.canGoBack()) {
				onGoBack()
			} else {
				// Lógica para quando não há mais telas para voltar
				console.log('Não há mais telas para voltar.');
			}
			return true;
		});

		return () => backHandler.remove();
	}, [navigation]);


	return (
		<View>
			<View style={styles.titleSection}>
				<Pressable
					style={styles.goBackCallToAction}
					onPress={() => onGoBack()}
				>
					<FontAwesomeIcon icon={faChevronLeft} />
				</Pressable>
				<CustomText
					type="display"
					fontWeight="bold"
					customStyle={styles.title}
				>
					{translate('title')}
				</CustomText>
			</View>
			<CustomText
				type="display"
				fontWeight="normal"
				customStyle={styles.subTitle}
			>
				{translate('description')}
			</CustomText>
			<View style={styles.inputContainer}>
				<View>
					<CustomText
						fontWeight="bold"
						type="text"
						customStyle={styles.label}
					>
						{translate('inputLabelPassword')}
					</CustomText>
					<View style={{ width: '100%', alignItems: 'center' }}>

						<OtpInputCode code={(resp) => setPassword(resp)} />

					</View>
				</View>
				<View>
					<CustomText
						fontWeight="bold"
						type="text"
						customStyle={styles.label}
					>
						{translate('inputLabelPasswordConfirm')}
					</CustomText>
					<View style={{ width: '100%', alignItems: 'center' }}>

						<OtpInputCode code={(resp) => setPasswordVerification(resp)} />

					</View>
				</View>
			</View>
			<Button
				onPress={() => {
					if (password.length < 4 || passwordVerification.length < 4) {
						setModalVisible(true)
						setMessage({ message: translate('erroLengh'), title: translate('error') })
					} else {
						if (password === passwordVerification) {
							onSubmit(password)
							return
						} else {
							setModalVisible(true)
							setMessage({ message: translate('identicalError'), title: translate('error') })
						}
					}
				}}
				title={translate('buttonContinue')}
				backgroundColor="#000"
				color="#fff"
				disabled={loading}
			/>
			<ComponentModal
				modalVisible={modalVisible}
				setModalVisible={() => {
					setModalVisible(!modalVisible)
					setMessage({ message: '', title: '' })
				}}
				message={message}
			/>
		</View>
	)
}
