import { useContext, useEffect, useState, useRef } from 'react'
import { AuthCode, ContactData } from './components'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StepsCounter } from '../../components'
import { styles } from './styles'
import { View, Platform, Dimensions } from 'react-native'
import { RegisterPassword } from './components/register-password/RegisterPassword'
import { AccountContext, TranslationContext } from '../../contexts'
import ComponentModal from '../../components/modal'
import { tranl } from '../../utils/translateMessage'
import DeviceInfo from 'react-native-device-info';
import TimeZone from 'react-native-timezone';
import { useTranslation } from '../../hooks'

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

import { HelpersAccount, HelpersSecurity } from '../../helpers'
const helpersAccount = new HelpersAccount()
const helpersSecurity = new HelpersSecurity()

//Storage
import { StorageAdapter, IdiomOptions } from '../../utils'
const storage = new StorageAdapter()

const AccountActivationSteps = {
    AuthCode: 1,
    ContactData: 2,
    Password: 3,
}

const Stack = createNativeStackNavigator()

const AccountActivation = ({ navigation }) => {
    const [currentStep, setCurrentStep] = useState(AccountActivationSteps.AuthCode)
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [message, setMessage] = useState({message: '', title: ''})
    const { accountDetails, setAccountDetails } = useContext(AccountContext)
    const { i18n, setLocale } = useContext(TranslationContext)
    const bottomSheetRef = useRef(null)

    const { translate } = useTranslation('codeActivationScreen')

    const handleCodeValidation = async (code) => {
        setLoading(true)
        try {
            const account = await helpersAccount.GetAccountByCode(code)
            setAccountDetails(account.accountDetails)
            setCurrentStep(AccountActivationSteps.ContactData)
            setLocale(IdiomOptions[account.accountDetails.defaultIdiom].isoCode)
        } catch (error) {
            setModalVisible(true)
            const messageKey = tranl[i18n.locale]
            setMessage({message: error.response?.data?.[messageKey] || 'Erro na validação do código', title: translate('error')})
            console.log(error.response?.data)
        } finally {
            setLoading(false)
        }
    }

    const handleSignUp = async ({ email, name, phone}) => {
        try {
            setLoading(true)
            const updateProfile = await helpersAccount.UpdateAccount({
                "accountId": accountDetails?.accountId,
                "name": name,
                "email": email,
                "legalId": "",
                "phoneNumber": phone,
                "language": accountDetails?.defaultIdiom || i18n.locale, 
                "geolocation": ""
            })
            
            // 1. Verifica se o backend retornou explicitamente { result: false, message: "..." }
            if (updateProfile && updateProfile.result === false) {
                setModalVisible(true)
                setMessage({ message: updateProfile.message || 'Erro de validação', title: translate('error') })
                return
            }

            // 2. Verifica se a API não lançou erro pro Catch, mas retornou a mensagem traduzida direto no objeto
            const messageKey = tranl[i18n.locale]
            if (updateProfile && updateProfile[messageKey]) {
                setModalVisible(true)
                setMessage({ message: updateProfile[messageKey], title: translate('error') })
                return
            }

            // Se chegou aqui, é sucesso! Avança de etapa.
            setCurrentStep(AccountActivationSteps.Password)

        } catch (error) {
            setModalVisible(true)
            const messageKey = tranl[i18n.locale]
            
            // 3. Tenta buscar a mensagem de várias camadas possíveis do erro do Axios
            const backendMessage = error.response?.data?.[messageKey] 
                                || error.response?.data?.message 
                                || error.message 
                                || 'Ocorreu um erro ao atualizar os dados'
            
            // Garante que a mensagem seja uma string para não quebrar o texto do Modal
            const finalMessage = typeof backendMessage === 'string' ? backendMessage : JSON.stringify(backendMessage)
            
            setMessage({ message: finalMessage, title: translate('error') })
        } finally {
            setLoading(false)
        }
    }

    const handleSetNewPassword = async (password) => {
        setLoading(true)
        try {
            const response = await helpersAccount.SetNewPasswordAccount({
                password: password,
                accountId: accountDetails?.accountId || ''
            })
            
            // Mesma lógica de validação aplicada à senha
            if (response && response.result === false) {
                setModalVisible(true)
                setMessage({ message: response.message || 'Erro ao redefinir a senha', title: translate('error') })
                return
            }

            const messageKey = tranl[i18n.locale]
            if (response && response[messageKey]) {
                setModalVisible(true)
                setMessage({ message: response[messageKey], title: translate('error') })
                return
            }

            handleFormSubmit(password)
        } catch (error) {
            setModalVisible(true)
            const messageKey = tranl[i18n.locale]
            const backendMessage = error.response?.data?.[messageKey] 
                                || error.response?.data?.message 
                                || 'Ocorreu um erro ao definir a senha'
            
            const finalMessage = typeof backendMessage === 'string' ? backendMessage : JSON.stringify(backendMessage)
            
            setMessage({ message: finalMessage, title: translate('error') })
        } finally {
            setLoading(false)
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
                        Brand : DeviceInfo.getBrand(),
                        Model : DeviceInfo.getModel(),
                        SystemName : DeviceInfo.getSystemName(),
                        SystemVersion : DeviceInfo.getSystemVersion(),
                        UniqueID : await DeviceInfo.getUniqueId(),
                        PlataformOS : Platform.OS,
                        ScreenW : windowWidth,
                        ScreenH : windowHeight,
                        TimeZone : TimeZone.getTimeZone(),
                        AppVersion : DeviceInfo.getVersion(),
                        AppBuildNumber : DeviceInfo.getBuildNumber()
                    })
                }
            )
            storage.set('saved-password', { savedPassword: password })
            storage.set('app-configs', { skipIntro: true })
            setAccountDetails({
                ...accountDetails,
                ...response.accountDetails
            })
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
            setMessage({ message: error.response?.data?.[messageKey] || 'Erro ao realizar login', title: translate('error') })
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
                    stepsLength={Object.keys(AccountActivationSteps)} 
                />
            </View>
            <Stack.Navigator
                initialRouteName={AccountActivationSteps.AuthCode.toString()}
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name={AccountActivationSteps.AuthCode.toString()}>
                    {() => (
                        <View style={styles.Wrapper}>
                            <AuthCode
                                navigation={navigation}
                                onContinue={handleCodeValidation}
                                loading={loading}
                            />
                        </View>
                    )}
                </Stack.Screen>
                <Stack.Screen
                    name={AccountActivationSteps.ContactData.toString()}
                >
                    {() => (
                        <View style={styles.Wrapper}>
                            <ContactData
                                navigation={navigation}
                                onGoBack={() =>
                                    setCurrentStep(
                                        AccountActivationSteps.AuthCode
                                    )
                                }
                                onSubmit={handleSignUp}
                                loading={loading}
                            />
                        </View>
                    )}
                </Stack.Screen>
                <Stack.Screen name={AccountActivationSteps.Password.toString()}>
                    {() => (
                        <View style={styles.Wrapper}>
                            <RegisterPassword
                                navigation={navigation}
                                onGoBack={() =>
                                    setCurrentStep(
                                        AccountActivationSteps.ContactData
                                    )
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
                    setMessage({message: '', title: ''})
                }}
                message={message}
            />
        </>
    )
}

export default AccountActivation