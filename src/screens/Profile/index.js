import { useContext, useState } from 'react'
import { View } from 'react-native'
import { CommonActions } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { styles } from './styles'
import PersonalData  from './components/PersonalData'
import { CustomText, ScreenTitle } from '../../components'
import Config  from './components/Config'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGear, faPerson } from '@fortawesome/free-solid-svg-icons'
import { AccountContext } from '../../contexts'
import { useTranslation,  } from '../../hooks'
import ComponentModal from '../../components/modal';

const Tab = createMaterialTopTabNavigator()

import { HelpersAccount } from '../../helpers/Account'
const helpersAccount = new HelpersAccount()

import { StorageAdapter } from '../../utils';
const storage = new StorageAdapter()

const Profile = ({ navigation }) => {
	const [loading, setLoading] = useState(false)
	const [modalVisible, setModalVisible] = useState(false);
	const [message, setMessage] = useState('')
	const { accountDetails, setAccountDetails } = useContext(AccountContext)

	const { translate } = useTranslation('profile')
	
	const handleUpdateProfile = async ({ name, phone, email}) => {
		try {
			setLoading(true)
			const updateProfile = await helpersAccount.UpdateAccount({
				"accountId": accountDetails?.accountId,
				"name": name,
				"email": email,
				"legalId": "",
				"phoneNumber": phone,
				"language": accountDetails?.defaultIdiom, 
				"geolocation": ""
			})
			setAccountDetails(updateProfile)
			setLoading(false)
			setModalVisible(true)
			setMessage({message: (translate("sucessMessage")), title: (translate("titleSucess"))})
		} catch (error) {
			setModalVisible(true)
			setMessage({message: 'error', title: translate('error') })
		}finally {
			setLoading(false)
		}
	}

	const handleUpdateConfig = async (values) => {
		try {
			setLoading(true)
			await helpersAccount.SetAccountSetup(values)
		} catch (error) {
			console.log('erro', error)
		}finally {
			setLoading(false)
		}
	}

	return (
		<View style={styles.contentContainer}>
			<ScreenTitle navigation={navigation} title={translate('title')} showBackButton />
			<Tab.Navigator initialRouteName={'PersonalData'}>
				<Tab.Screen
					name={'PersonalData'}
					options={{
						tabBarLabel: ({ focused }) => (
							<View style={styles.tabLabelContainer}>
								<FontAwesomeIcon
									icon={faPerson}
									color={focused ? '#04B2D4' : '#19191999'}
								/>
								<CustomText
									type="display"
									fontWeight={focused ? 'bold' : 'normal'}
									customStyle={{
										...styles.tabLabelContainer,
										color: focused
											? '#04B2D4'
											: '#19191999',
									}}
								>
									{translate('personalData')}
								</CustomText>
							</View>
						),
					}}
				>
					{
						props => 
							<PersonalData
								{...props}
								navigation={navigation}
								onSubmit={handleUpdateProfile}
								loading={loading}
							/>
					}
				</Tab.Screen>
				<Tab.Screen
					name={'Config'}
					options={{
						tabBarActiveTintColor: '#04B2D4',
						tabBarLabel: ({ focused }) => (
							<View style={styles.tabLabelContainer}>
								<FontAwesomeIcon
									icon={faGear}
									color={focused ? '#04B2D4' : '#19191999'}
								/>
								<CustomText
									type="display"
									fontWeight={focused ? 'bold' : 'normal'}
									customStyle={{
										...styles.tabLabelContainer,
										color: focused
											? '#04B2D4'
											: '#19191999',
									}}
								>
									{translate('config')}
								</CustomText>
							</View>
						),
					}}
				>
					{props => 
						<Config
							{...props}
							navigation={navigation}
							onSubmit={handleUpdateConfig}
							loading={loading}
						/>
					}
				</ Tab.Screen>
			</Tab.Navigator>
			<ComponentModal 
				modalVisible={modalVisible} 
				setModalVisible={() => {
					setModalVisible(!modalVisible)
					setMessage({message: '', title: ''})
				}}
				message={message}
			/>
		</View>
	)
}


export default Profile