import React, { useState, useEffect } from 'react'
import { Pressable, View, BackHandler } from 'react-native'
import { useForm } from 'react-hook-form'
import { CustomText, Button, ControlledTextInput } from '../../../../components'
import ComponentModal from '../../../../components/modal'
import { styles } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from '../../../../hooks'
import OtpInputCode from '../../../../components/otp-input-code'

export const RegisterPassword = ({
	onGoBack,
	navigation,
	onSubmit,
	loading
}) => {
	const [modalVisible, setModalVisible] = useState(false)
	const [message, setMessage] = useState({ message: '', title: '' })
	const [password, setPassword] = useState('')
	const [passwordVerification, setPasswordVerification] = useState('')

	
	const { translate } = useTranslation('setPasswordScreen')

	useEffect(() => {
		const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
		  	if (navigation.canGoBack()){
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
							customStyle={styles.labelLogin}
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
							customStyle={styles.labelLogin}
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
					if(password.length < 4 || passwordVerification.length < 4){
						setModalVisible(true)
						setMessage({ message: translate("erroCaractersNumber"), title: translate('error') })
					}else {
						if(password === passwordVerification){
							onSubmit(password)
							return
						}else {
							setModalVisible(true)
							setMessage({ message: translate("erroPassIdentical"), title: translate('error') })
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
