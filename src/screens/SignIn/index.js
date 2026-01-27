import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Image, Pressable, SafeAreaView, Text, View, Platform, KeyboardAvoidingView, Keyboard, Dimensions } from 'react-native'
import Geolocation from 'react-native-geolocation-service';
import { tranl } from '../../utils/translateMessage'

import styles from './styles'

import * as LocalAuthentication from 'expo-local-authentication'
import {
	Button,
	ControlledTextInput
} from '../../components'
import ComponentModal from '../../components/modal';
import { CustomText } from '../../components/custom-text'
import OtpInputCode from '../../components/otp-input-code'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { AccountContext, TranslationContext } from '../../contexts'
import { useTranslation } from '../../hooks'
import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetView,
} from '@gorhom/bottom-sheet/'


import DeviceInfo from 'react-native-device-info';
import TimeZone from 'react-native-timezone';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

//Storage
import { StorageAdapter, IdiomOptions } from '../../utils'
const storage = new StorageAdapter()

//helpers
import { HelpersSecurity } from '../../helpers'
const helpersSecurity = new HelpersSecurity()

const SignIn = ({ navigation }) => {
	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const [modalVisible, setModalVisible] = useState(false)
	const [message, setMessage] = useState({ message: '', title: '' })
	const [keyboardStatus, setKeyboardStatus] = useState(false);
	const [value, setValue] = useState('')
	const { accountDetails, setAccountDetails } = useContext(AccountContext)
	const { i18n, setLocale } = useContext(TranslationContext)
	const { translate } = useTranslation('signInScreen')

	useEffect(() => {
		const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
			setKeyboardStatus(true);
		});
		const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
			setKeyboardStatus(false);
		});

		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, []);


	const { control, handleSubmit, getValues, watch } = useForm({
		defaultValues: {
			email: accountDetails?.email || null,
			password: '',
		},
	})

	const bottomSheetRef = useRef(null)
	const handleClosePress = () => bottomSheetRef.current.close()
	const email = watch('email');
	const isValidEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


	const renderBackdrop = useCallback(
		(props) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
			/>
		), []
	)

	const getCurrentPositionPromise = () => {
		return new Promise((resolve, reject) => {
			Geolocation.getCurrentPosition(
				(position) => resolve(JSON.stringify(position)),
				() => resolve(""),
				{
					enableHighAccuracy: true,
					timeout: 15000,
					maximumAge: 10000
				}
			);
		});
	};

	const handleAuthentication = async () => {
		const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync()
		const savedPassword = await storage.get('saved-password')
		if (!isBiometricEnrolled || !savedPassword?.savedPassword) {
			return
		}

		const auth = await LocalAuthentication.authenticateAsync({
			promptMessage: 'Autentique-se para continuar',
			fallbackLabel: 'Use a senha',
		})

		if (auth.success) {
			try {
				setLoading(true)
				if (accountDetails) {
					const response = await helpersSecurity.SignIn({
						"login": accountDetails.email,
						"password": savedPassword?.savedPassword,
						'timeoutInMinutes': 0,
						'geolocation': await getCurrentPositionPromise(),
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
					})
					setIsBottomSheetOpen(true)
					setAccountDetails({
						...accountDetails,
						...response.accountDetails,
					})

					setLocale(IdiomOptions[response.accountDetails.defaultIdiom].isoCode)

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
									params: { screen: 'HomeContainer' }
								}
							],
						});
					}
				}
			} catch (error) {
				setModalVisible(true)
				const messageKey = tranl[i18n.locale]
				let finalMessage; // Usamos let para poder reatribuir o valor
				// Verificamos se o caminho até a mensagem de erro existe e se a mensagem não é vazia
				if (error.response && error.response.data && error.response.data[messageKey]) {
					finalMessage = error.response.data[messageKey];
				} else {
					finalMessage = translate("unexpectederror");
				}

				setMessage({ message: finalMessage, title: translate('error') });
			} finally {
				setLoading(false)
			}
		}
	}

	useEffect(() => {
		const getAuthData = async () => {
			const responseToken = await storage.get('auth-token')
			const responseAccountDetails = await storage.get('accountDetails')

			if (responseToken?.token && responseAccountDetails?.accountId) {
				handleAuthentication()
			}
		}

		getAuthData()
	}, [])

	const handleFormSubmit = async (data) => {
		try {
			setLoading(true)
			const response = await helpersSecurity.SignIn(
				{
					'login': data.email,
					'password': value,
					'timeoutInMinutes': 0,
					'geolocation': await getCurrentPositionPromise(),
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

			storage.set('saved-password', { savedPassword: value })
			storage.set('app-configs', { skipIntro: true })

			setAccountDetails({
				...accountDetails,
				...response.accountDetails
			})

			setLocale(IdiomOptions[response.accountDetails.defaultIdiom].isoCode)

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
							params: { screen: 'HomeContainer' }
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

	const handleAdvanceForm = async () => {
		Keyboard.dismiss()
		const savedPassword = await storage.get('saved-password')
		if (!savedPassword?.savedPassword) {
			setIsBottomSheetOpen(true)
			return
		}

		setIsBottomSheetOpen(true)
	}


	const forgotPassword = async () => {
		setLoading(true)
		try {
			const a = await helpersSecurity.SendPasswordRecoveryToken({ email: getValues('email') })
			navigation.navigate('ForgotPassword', { emailValue: getValues('email') })
		} catch (error) {
			setModalVisible(true)
			const messageKey = tranl[i18n.locale]
			setMessage({ message: error.response.data[messageKey], title: translate('error') })
		} finally {
			setLoading(false)
		}
	}


	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Image
					source={require('../../assets/gifs/loading.gif')}
					style={{
						width: 200,
						height: 200,
					}}
				/>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
				<SafeAreaView style={styles.safeContainer}>
					<View style={styles.header}>
						<Pressable onPress={navigation.goBack}>
							<Text style={styles.headerTitle}>Login</Text>
						</Pressable>
					</View>

					<ControlledTextInput
						control={control}
						label={translate('inputLabelEmail')}
						placeholder={translate('inputPlaceholderEmail')}
						name="email"
						keyboardType="email-address"
						initialValue={accountDetails?.email}
						autoCapitalize={'none'}
					/>

					<Button
						backgroundColor="black"
						color="white"
						title={translate('buttonContinue')}
						disabled={!isValidEmail}
						onPress={handleAdvanceForm}
						customStyle={styles.signInButton}
					/>

					<View>
						<Text style={styles.noAccountText}>
							{translate('supportTextCreateAccount')}
						</Text>
						<Pressable
							onPress={() => navigation.navigate('SignUp')}
						>
							<Text style={styles.textLink}>
								{translate('linkCreateAccount')}
							</Text>
						</Pressable>
						<View style={{ height: 20 }} />
						<Pressable
							onPress={() => navigation.navigate('Welcome')}
						>
							<Text style={styles.textLinkBack}>
								{translate('linkGoHome')}
							</Text>
						</Pressable>
					</View>
				</SafeAreaView>
				<BottomSheet
					ref={bottomSheetRef}
					index={isBottomSheetOpen ? 0 : -1}
					snapPoints={[keyboardStatus ? 500 : 400]}
					backdropComponent={renderBackdrop}
					enablePanDownToClose={true}
					onClose={() => {
						setIsBottomSheetOpen(false)
					}}
				>

					<BottomSheetView style={styles.bottomSheetView}>
						<View>
							<View style={styles.bottomSheetHeader}>
								<View />
								<Pressable
									onPress={() => {
										setIsBottomSheetOpen(false)
										handleClosePress()
										Keyboard.dismiss()
									}}
								>
									<FontAwesomeIcon icon={faX} />
								</Pressable>
							</View>
							<CustomText
								fontWeight="bold"
								type="text"
								customStyle={styles.labelLogin}
							>
								Login
							</CustomText>
							<View style={{ width: '100%', alignItems: 'center' }}>
								<OtpInputCode code={(resp) => setValue(resp)} />
							</View>
							<Button
								onPress={() => {
									setIsBottomSheetOpen(false)
									forgotPassword()
								}}
								title={translate('forgotPasswordLink')}
								backgroundColor="transparent"
								color="#04B2D4"
								type={'Link'}
								customStyle={styles.forgotPasswordButton}
							/>

							<Button
								backgroundColor="black"
								color="white"
								title={translate('buttonSignIn')}
								disabled={
									value.length < 4 || loading
								}
								onPress={handleSubmit(handleFormSubmit)}

							/>
						</View>
					</BottomSheetView>

				</BottomSheet>
				<ComponentModal
					modalVisible={modalVisible}
					setModalVisible={() => {
						setModalVisible(!modalVisible)
						setMessage({ message: '', title: '' })
					}}
					message={message}
				/>
			</KeyboardAvoidingView>
		</View>
	)
}


export default SignIn;