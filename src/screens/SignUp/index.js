import { useContext, useEffect, useState } from 'react'
import { View, Platform, Dimensions } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StepsCounter } from '../../components/steps-counter'
import { styles } from './styles'
import { AccountContext, TranslationContext } from '../../contexts'
import ComponentModal from '../../components/modal'
import { useTranslation } from '../../hooks'
import { AuthCode, ContactData } from './components'
import { RegisterPassword } from './components/register-password'
import { tranl } from '../../utils/translateMessage'

import DeviceInfo from 'react-native-device-info';
import TimeZone from 'react-native-timezone';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;


//helpers
import { HelpersAccount, HelpersSecurity } from '../../helpers'
const helpersAccount = new HelpersAccount()
const helpersSecurity = new HelpersSecurity()

//Storage
import { StorageAdapter } from '../../utils'
const storage = new StorageAdapter()

const SignUpSteps = {
	ContactData: 1,
	AuthCode: 2,
	Password: 3
}

const Stack = createNativeStackNavigator()

const SignUp = ({ navigation }) => {
	const [currentStep, setCurrentStep] = useState(SignUpSteps.ContactData)
	const [loading, setLoading] = useState(false)
	const [modalVisible, setModalVisible] = useState(false)
	const [message, setMessage] = useState({ message: '', title: '' })
	const { accountDetails, setAccountDetails } = useContext(AccountContext)
	const { i18n } = useContext(TranslationContext)

	const { translate } = useTranslation('signInScreen')


	const handleSignUp = async ({ email, name, phone }) => {
		try {
			setLoading(true)
			const details = await helpersAccount.CreateAccount({
				"accountId": '00000000-0000-0000-0000-000000000000',
				'email': email,
				"legalId": "",
				'name': name,
				'phoneNumber': phone,
				"language": i18n.locale
			})

			if (details.result) {
				await helpersAccount.RequestValidationCode(details.accountDetails.accountId)
				setAccountDetails(details.accountDetails)
				setCurrentStep(SignUpSteps.AuthCode)
			} else {
				setModalVisible(true)
				setMessage({ message: details.message, title: translate('error') })
			}
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	const handleCodeValidation = async (code) => {
		try {
			await helpersAccount.ValidateCode({
				"identifier": accountDetails?.email,
				"code": code
			})
			setCurrentStep(SignUpSteps.Password)
		} catch (error) {
			setModalVisible(true)
			const messageKey = tranl[i18n.locale]
			setMessage({ message: error.response.data[messageKey], title: translate('error') })
		} finally {
			setLoading(false)
		}
	}

	const handleSetNewPassword = async (password) => {
		setLoading(true)
		try {
			await helpersAccount.SetNewPasswordAccount({
				password: password,
				accountId: accountDetails?.accountId || ''
			})
			handleFormSubmit(password)
		} catch (error) {
			console.log(error)
		}
	}

	const handleFormSubmit = async (password) => {
		try {
			setLoading(true)
			const response = await helpersSecurity.SignIn(
				{
					'login': accountDetails?.email,
					'password': password,
					'timeoutInMinutes': 0,
					'geolocation': "",
					"devInfo": JSON.stringify({
						Brand: DeviceInfo.getBrand(),
						Model: DeviceInfo.getModel(),
						SystemName: DeviceInfo.getSystemName(),
						SystemVersion: DeviceInfo.getSystemVersion(),
						UniqueID: await DeviceInfo.getUniqueId(),
						PlataformOS: Platform.OS,
						ScreenW: windowWidth,
						ScreenH: windowHeight,
						TimeZone: TimeZone.getTimeZone(),
						AppVersion: DeviceInfo.getVersion(),
						AppBuildNumber: DeviceInfo.getBuildNumber()
					})
				}
			)
			storage.set('saved-password', { savedPassword: password })
			storage.set('app-configs', { skipIntro: true })
			setAccountDetails({
				...accountDetails,
				...response.accountDetails
			})
			// ** Aqui vamos chamar a nova tela de aceite de polices 
			if (response.accountDetails.polices[0].readed === true) {
				navigation.reset({
					index: 0,
					routes: [{ name: 'HomeContainer' }],
				});
			} else {
				navigation.reset({
					index: 0,
					routes: [
						{
							name: 'Polices',
							params: { screen: 'Onboarding' }
						}
					],
				});
			}
		} catch (error) {
			setModalVisible(true)
			const messageKey = tranl[i18n.locale]
			setMessage({ message: error.response.data[messageKey], title: translate('error') })
		} finally {
			setLoading(false)
		}
	}

	const sendNewCode = async () => {
		try {
			setLoading(true)
			await helpersAccount.RequestValidationCode(accountDetails.accountId)
		} catch (error) {
			setModalVisible(true)
			setMessage({ message: error.message, title: translate('error') })
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		navigation.navigate(currentStep.toString())
	}, [currentStep])

	return (
		<>
			<View style={styles.Wrapper}>
				<StepsCounter
					currentStep={currentStep}
					stepsLength={Object.keys(SignUpSteps)}
				/>
			</View>
			<Stack.Navigator
				initialRouteName={SignUpSteps.ContactData.toString()}
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name={SignUpSteps.ContactData.toString()}>
					{() => (
						<View style={styles.Wrapper}>
							<ContactData
								navigation={navigation}
								loading={loading}
								onSubmit={handleSignUp}
							/>
						</View>
					)}
				</Stack.Screen>
				<Stack.Screen name={SignUpSteps.AuthCode.toString()}>
					{() => (
						<View style={styles.Wrapper}>
							<AuthCode
								navigation={navigation}
								loading={loading}
								onContinue={handleCodeValidation}
								onGoBack={() =>
									setCurrentStep(SignUpSteps.ContactData)
								}
								sendNewCode={() => sendNewCode()}
							/>
						</View>
					)}
				</Stack.Screen>
				<Stack.Screen name={SignUpSteps.Password.toString()}>
					{() => (
						<View style={styles.Wrapper}>
							<RegisterPassword
								navigation={navigation}
								onGoBack={() =>
									setCurrentStep(SignUpSteps.AuthCode.toString())
								}
								onSubmit={handleSetNewPassword}
								loading={loading}
							/>
						</View>
					)}
				</Stack.Screen>
			</Stack.Navigator>
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

export default SignUp