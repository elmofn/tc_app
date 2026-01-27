import React, { useState, useEffect,useContext } from 'react'
import { SafeAreaView, View, Image } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import { styles } from './styles'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TravelShopHome from './components/TravelShopHome'
import TravelShopActivation from './components/TravelShopActivation'
import { BottomNavigationContext } from '../../contexts'

const Stack = createNativeStackNavigator()

//Storage
import { StorageAdapter } from '../../utils'
const storage = new StorageAdapter()

const TravelShop = ({navigation}) => {
	const [loading, setLoading] = useState(true);
	const [initialRoute, setInitialRoute] = useState('TravelShopHome')
	const isFocused = useIsFocused(); 
	const { setShow } = useContext(BottomNavigationContext)

	useEffect(() => {
		const validateUserState = async () => {
		  const configs = await storage.get('shop-configs');
		  if (!configs) {
			setLoading(false);
			return;
		  }
	
		  if (configs.skipIntro) {
			setInitialRoute('TravelShopHome');
			setLoading(false);
		  }
		};
	
		if (isFocused) { // Checa se a tela está em foco
		 	validateUserState();
		}
	  }, [isFocused]); // Adiciona isFocused ao array de dependências

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
			<Stack.Navigator
				initialRouteName={initialRoute}
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen
					name={'TravelShopActivation'}
					component={TravelShopActivation}
				/>
				<Stack.Screen
					name={'TravelShopHome'}
					component={TravelShopHome}
				/>
			</Stack.Navigator>
		</View>
	)
}

export default TravelShop