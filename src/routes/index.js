import React, { useEffect, useState, useContext } from 'react'
import { View, Image } from 'react-native'
import { Platform, PermissionsAndroid } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import { AccountContext } from '../contexts'

//Storage
import { StorageAdapter } from '../utils'
const storage = new StorageAdapter()

import Welcome from '../screens/Welcome'
import SignIn from '../screens/SignIn'
import AccountActivation from '../screens/AccountActivation'
import SignUp from '../screens/SignUp'
import ForgotPassword from '../screens/ForgotPassword'
import HomeContainer from '../containers/home'
import Polices from '../screens/Polices'
import Profile from '../screens/Profile'
import UpdatePassword from '../screens/UpdatePassword'
import FAQ from '../screens/FAQ'
import Concierge from '../screens/Concierge'
import SignUpOnboarding from '../screens/SignUpOnboarding'
import Alerts from '../screens/Alerts'
// import MyTravelCardFactory from '@/screens/factories/my-travelcard/MyTravelCard.factory'
// import TravelCardActivationFactory from '@/screens/factories/travelcard-activation/TravelCardActivation.factory'
import Logout from '../screens/Logout'

const Stack = createNativeStackNavigator()

const Router = () => {
	const [initialRoute, setInitialRoute] = useState('Welcome')
	const [loading, setLoading] = useState(true);
	const { initializing } = useContext(AccountContext)

	useEffect(() => {
		const validateUserState = async () => {
			const configs = await storage.get('app-configs')
			if (!configs) {
				setLoading(false)
				return
			}

			if (configs.skipIntro) {
				setInitialRoute('SignIn')
				setLoading(false)
			}
		}

		initializing ? null : validateUserState() 
	}, [initializing])

	useEffect(() => {
		const requestLocationPermission = async () => {
			if (Platform.OS === 'ios') {
				const response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
				switch (response) {
					case RESULTS.GRANTED:
						console.log('Permissão para acessar localização concedida');
						break;
					case RESULTS.DENIED:
						console.log('Permissão para acessar localização negada');
						break;
					case RESULTS.BLOCKED:
						console.log('Permissão para acessar localização bloqueada');
						break;
					case RESULTS.UNAVAILABLE:
						console.log('Permissão para acessar localização indisponível');
						break;
				}
			} else {
				PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
					{
						title: 'Permissão de Localização',
						message: 'O aplicativo precisa acessar sua localização.',
						buttonNeutral: 'Pergunte-me depois',
						buttonNegative: 'Cancelar',
						buttonPositive: 'OK',
					}
				).then(granted => {
					if (granted === PermissionsAndroid.RESULTS.GRANTED) {
						//console.log('Permissão para acessar localização concedida'); 
					} else {
						//console.log('Permissão para acessar localização negada');
					}
				});
			}
		}

		requestLocationPermission();
	}, []);



	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Image
					source={require('../assets/gifs/loading.gif')}
					style={{
						width: 200,
						height: 200,
					}}
				/>
			</View>
		)
	}

	return (
		<Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
			<Stack.Screen name={'Welcome'} component={Welcome} />
			<Stack.Screen name={'AccountActivation'} component={AccountActivation} />
			<Stack.Screen name={'SignIn'} component={SignIn} />
			<Stack.Screen name={'SignUp'} component={SignUp} />
			<Stack.Screen name={'Polices'} component={Polices} />
			<Stack.Screen name={'HomeContainer'} component={HomeContainer} options={{ gestureEnabled: false }} />
			<Stack.Screen name={'ForgotPassword'} component={ForgotPassword} />
			<Stack.Screen name={'Profile'} component={Profile} />
			<Stack.Screen name={'UpdatePassword'} component={UpdatePassword} />
			<Stack.Screen name={'FAQ'} component={FAQ} />
			<Stack.Screen name={'Concierge'} component={Concierge} />
			<Stack.Screen name={'Onboarding'} component={SignUpOnboarding} />
			<Stack.Screen name={'Alerts'} component={Alerts} />
			<Stack.Screen name={'Logout'} component={Logout} />
		</Stack.Navigator>
	)
}


export default Router;
