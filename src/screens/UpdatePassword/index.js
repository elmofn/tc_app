import React, { useContext, useState } from 'react'
import { View, Pressable } from 'react-native'
import { useForm } from 'react-hook-form'
import { CustomText, Button, ControlledTextInput } from '../../components'
import { StepsCounter } from '../../components/steps-counter'
import { styles } from './styles'
import { useTranslation } from '../../hooks'
import { AccountContext } from '../../contexts'
import ComponentModal from '../../components/modal'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import  OtpInputCode  from '../../components/otp-input-code'

import { HelpersAccount } from '../../helpers'
const helpersAccount = new HelpersAccount()

const SignUpSteps = {
	ContactData: 1,
	AuthCode: 2,
	Password: 3
}

export const UpdatePassword = ({ navigation }) => {
	const { accountDetails } = useContext(AccountContext)
	const [loading, setLoading] = useState(false)
	const [modalVisible, setModalVisible] = useState(false)
	const [message, setMessage] = useState({ message: '', title: '' })
	const [password, setPassword] = useState('')
	const [passwordVerification, setPasswordVerification] = useState('')

	const { translate } = useTranslation('setPasswordScreen')

	const handleUpdatePassword = async () => {
		setLoading(true)
		try {
			await helpersAccount.SetNewPasswordAccount({
				password: password,
				accountId: accountDetails?.accountId || ''
			})
			navigation.navigate('Profile')
			setModalVisible(true)
			setMessage({ message: translate('attPass'), title: translate('sucess')  })
		} catch (error) {
			setModalVisible(true)
			setMessage({ message: error, title: translate('error') })
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			{/* <View style={styles.Wrapper}>
				<StepsCounter
					currentStep={3}
					stepsLength={Object.keys(SignUpSteps)}
				/>
			</View> */}
			<View style={styles.Wrapper} >

				<View style={styles.titleSection}>
					<Pressable
						style={styles.goBackCallToAction}
						onPress={() => navigation.goBack()}
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
						if (password.length < 4 || passwordVerification.length < 4) {
							setModalVisible(true)
							setMessage({ message: translate("erroCaractersNumber"), title: translate('error') })
						} else {
							if (password === passwordVerification) {
								handleUpdatePassword()
								return
							} else {
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
			</View>
			<ComponentModal
				modalVisible={modalVisible}
				setModalVisible={() => {
					setModalVisible(!modalVisible)
					setMessage({ message: '', title: '' })
				}}
				message={message}
			/>
		</>
	)
}

export default UpdatePassword
